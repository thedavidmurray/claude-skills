---
name: hook-creator
description: Create, configure, and debug Claude Code hooks — shell commands that run deterministically at lifecycle events like PreToolUse, PostToolUse, SessionStart, UserPromptSubmit, and Stop. Use when user says "create a hook", "block Claude from running X", "run the formatter after every edit", "add a check before commits", "inject context at session start", "my hook isn't firing", or asks about settings.json hooks, exit code 2, matchers, or enforcing rules Claude keeps forgetting.
metadata:
  tags: [hooks, claude-code, automation, enforcement, settings, meta]
  tier: task-specific
  domain: kernel
when_to_apply: When a rule must be enforced deterministically rather than remembered — or when authoring/debugging any Claude Code hook
---
# Hook Creator

Hooks are shell commands the Claude Code harness runs at lifecycle events. Unlike
CLAUDE.md instructions or skills, hooks are **deterministic**: they execute every
time, whether or not the model remembers. That makes them the right tool for rules
that must never be violated.

## Hook vs Skill vs CLAUDE.md

| Need | Use |
|------|-----|
| "Claude must NEVER run `rm -rf` / edit `.env` / push to main" | Hook (PreToolUse, blocking) |
| "Always run prettier after editing" | Hook (PostToolUse) |
| "Follow this workflow when asked to X" | Skill |
| "Remember our conventions" | CLAUDE.md |

Rule of thumb: if violating it once is acceptable, instructions suffice. If not, hook it.

## Configuration

Hooks live in `~/.claude/settings.json` (all projects), `.claude/settings.json`
(shared via git), or `.claude/settings.local.json` (personal). Structure:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/check.sh", "timeout": 10 }
        ]
      }
    ]
  }
}
```

- `matcher` filters which occurrences fire the hook. For tool events: exact tool name
  (`"Bash"`), pipe-separated (`"Edit|Write"`), or regex (`"mcp__github__.*"`).
  Empty/omitted = match everything.
- `timeout` is in seconds. Keep hooks fast — they block the loop.

## Core Events

| Event | Fires | Can block? |
|-------|-------|-----------|
| `PreToolUse` | Before a tool call executes | Yes |
| `PostToolUse` | After a tool call succeeds | No (feedback only) |
| `PostToolUseFailure` | After a tool call fails | No |
| `UserPromptSubmit` | When the user submits a prompt | Yes; stdout joins context |
| `SessionStart` | Session begins/resumes (matchers: `startup`, `resume`, `clear`, `compact`) | No; stdout joins context |
| `Stop` | Claude finishes responding | Yes (forces continuation) |
| `SubagentStart` / `SubagentStop` | Subagent lifecycle | — / Yes |
| `PreCompact` | Before context compaction (`manual`, `auto`) | No |
| `SessionEnd` | Session terminates | No |

There are more (Notification, FileChanged, PermissionRequest, TaskCompleted, ...) —
run `/hooks` to browse events, and see the official hooks reference for the full list.

## The Contract: stdin, exit codes, stdout

Your command receives event JSON on **stdin**:

```json
{
  "session_id": "abc123",
  "cwd": "/home/user/project",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": { "command": "rm -rf build" }
}
```

It responds with an **exit code**:

- **0** — proceed. For `UserPromptSubmit`/`SessionStart`, stdout is added to Claude's context.
- **2** — block (on blockable events). stderr is shown to Claude as feedback, so write it as an instruction: `"Blocked: use 'npm run clean' instead of rm -rf"`.
- **other** — non-blocking error; the action proceeds and the error is logged.

For finer control, exit 0 and print JSON: `permissionDecision` (`"allow"|"deny"|"ask"`)
with `permissionDecisionReason` for PreToolUse; `additionalContext` to inject text;
`continue: false` to halt; `systemMessage` to warn the user.

## Worked Examples

**1. Block dangerous commands** (PreToolUse, matcher `Bash`):

```bash
#!/bin/bash
cmd=$(jq -r '.tool_input.command // ""')
if echo "$cmd" | grep -qE 'rm -rf /|git push.*--force.*\b(main|master)\b'; then
  echo "Blocked by policy: $cmd" >&2
  exit 2
fi
```

**2. Auto-format after edits** (PostToolUse, matcher `Edit|Write`):

```bash
#!/bin/bash
file=$(jq -r '.tool_input.file_path // ""')
case "$file" in
  *.ts|*.tsx|*.js) npx prettier --write "$file" >/dev/null 2>&1 ;;
  *.py) ruff format "$file" >/dev/null 2>&1 ;;
esac
exit 0
```

**3. Protect files** (PreToolUse, matcher `Edit|Write`):

```bash
#!/bin/bash
file=$(jq -r '.tool_input.file_path // ""')
case "$file" in
  *.env*|*/secrets/*) echo "Editing $file is not allowed" >&2; exit 2 ;;
esac
```

**4. Inject context at session start** (SessionStart): a script that echoes current
sprint notes or service status to stdout — it lands in Claude's context.

## Creation Workflow

1. State the rule and pick the event + matcher (narrowest matcher that covers it).
2. Decide fail-open vs fail-closed: if the hook script itself errors, exit non-2 codes
   fail open. For security-critical hooks, validate inputs defensively.
3. Write the script in `.claude/hooks/`, `chmod +x` it, and test it standalone:
   `echo '{"tool_input":{"command":"rm -rf /"}}' | ./check.sh; echo $?`
4. Wire it into settings.json; reload (new session) and verify with `/hooks`.
5. Test both directions: the violation is blocked AND normal work is not.

## Debugging

- `/hooks` — lists every configured hook by event, with source file and matcher
- Transcript view (Ctrl+O) — per-hook one-line results; blocking errors show stderr
- `claude --debug` (or `--debug-file <path>`) — which hooks matched, exit codes, full stderr
- Most common failures: script not executable, `jq` not installed, matcher case wrong
  (tool names are exact: `Bash`, not `bash`), editing settings mid-session (restart)

## Iron Rules

1. **Hooks run arbitrary shell with your credentials.** Review any third-party hook
   before installing; never wire untrusted code into settings.
2. **Fast and quiet.** Hooks block the agent loop; set a `timeout`, suppress noisy stdout.
3. **stderr on exit 2 is a prompt** — write it as a corrective instruction, not a log line.
4. **Idempotent.** PostToolUse hooks may fire many times per session.

## When NOT to Use

- The behavior needs judgment or context — that's a skill or CLAUDE.md line
- One-off automation — just ask Claude to do it
- Reacting to PR/CI events — that's CI or GitHub Actions, not session hooks

## Related Skills

- `claude-md-author` — for rules that only need to be remembered
- `skill-creator` — for multi-step workflows
- `subagent-creator` — agents can carry their own scoped hooks
- `prompt-engineering` — writing effective stderr feedback
