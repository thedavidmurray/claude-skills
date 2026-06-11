---
name: subagent-creator
description: Create custom Claude Code subagents — markdown files in .claude/agents/ that define specialized agents with their own system prompt, tool restrictions, and isolated context window. Use when user says "create an agent", "create a subagent", "make a code-reviewer agent", "delegate this to an agent", "custom agent for X", or asks about .claude/agents, agent frontmatter, the /agents command, or when to use a subagent versus a skill.
metadata:
  tags: [subagents, agents, claude-code, delegation, meta]
  tier: task-specific
  domain: kernel
when_to_apply: When defining a reusable specialized agent, or deciding whether work belongs in a subagent versus a skill
---
# Subagent Creator

A subagent is a markdown file defining a specialized agent: frontmatter for
configuration, body as its system prompt. Claude delegates tasks to it; it works in
its **own isolated context window** and returns only its final message to the caller.

## Subagent vs Skill

| Factor | Skill | Subagent |
|--------|-------|----------|
| Runs in | Main conversation context | Separate context window |
| Best for | Procedures Claude follows inline | Work that's context-heavy, parallelizable, or needs tool limits |
| Tool restrictions | Advisory | Enforced (`tools` allowlist) |
| Output | Everything visible in main thread | Only the final message returns |

Choose a subagent when the work would flood the main context (broad searches, long
review reports), when it should run in parallel, or when it must be sandboxed to
read-only tools. Choose a skill when Claude just needs better instructions. They
compose: a subagent can preload skills via the `skills` field.

## File Locations

- `.claude/agents/<name>.md` — project, shared via git
- `~/.claude/agents/<name>.md` — personal, all projects
- Plugins can ship agents in an `agents/` directory

Project agents shadow personal ones with the same `name`. Created via the `/agents`
UI they take effect immediately; hand-edited files need a session restart.

## File Format

```markdown
---
name: code-reviewer
description: Reviews diffs for bugs and security issues. Use proactively after
  significant code changes, before declaring work done.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer. When given a diff or file list:

1. Read every changed file fully before judging.
2. Check correctness first, then security (injection, secrets, authz), then quality.
3. Only report issues you are confident about — no style nitpicks.

Report findings as:
- CRITICAL/HIGH/MEDIUM with file:line, the problem, and a concrete fix
- End with a one-line verdict: APPROVE or NEEDS WORK

Your final message is the entire deliverable — the caller sees nothing else.
Include everything needed to act on the review.
```

## Frontmatter Fields

Required: `name` (lowercase-hyphens, must be unique), `description`.

| Field | Semantics |
|-------|-----------|
| `description` | Drives delegation — Claude matches tasks against it. Say what it does AND when to use it; add "use proactively" to encourage automatic delegation |
| `tools` | Comma-separated allowlist. Omit to inherit all tools. Restrict review/research agents to `Read, Grep, Glob, Bash` |
| `disallowedTools` | Denylist; applied against inherited or listed tools |
| `model` | `sonnet`/`opus`/`haiku`, a full model ID, or `inherit` (default). Use a fast model for high-volume search agents |
| `permissionMode` | e.g. `default`, `acceptEdits`, `plan`. Parent's stricter modes take precedence |
| `maxTurns` | Cap on agentic turns — a runaway-loop guard |
| `skills` | Skill names whose full content is preloaded at startup |
| `memory` | `user`, `project`, or `local` — gives the agent persistent cross-session notes |

Advanced (see official docs): `hooks` scoped to the agent, `mcpServers`,
`isolation: worktree`, `background`, `color`.

## Writing the System Prompt (the body)

The body replaces Claude's normal instructions for this agent. Write it like a
standing operating procedure:

1. **Role and scope** — what it is, what it must not touch
2. **Process** — numbered steps, concrete commands, decision criteria
3. **Output contract** — exactly what the final message must contain. This is the
   most-missed part: the caller sees *only* the final message, so demand a complete,
   structured report ("include file:line for every finding")
4. **Boundaries** — when to stop, what to do when blocked (it cannot ask the user
   questions mid-task; tell it to return findings + open questions instead)

Key behavioral facts to design around:

- Fresh context per invocation: it knows nothing about the conversation except the
  task prompt it's given — so its prompt must demand self-contained task descriptions
- Subagents cannot spawn other subagents
- It inherits the parent session's permissions, narrowed by `tools`

## Creation Workflow

1. Confirm a subagent is right (table above). One agent = one job; split "review and
   fix" into a reviewer and a fixer rather than one do-everything agent.
2. Draft frontmatter: trigger-rich description, minimal `tools` for the job,
   `model` chosen by cost/latency needs.
3. Draft the body using the four-part structure above.
4. Save to `.claude/agents/<name>.md`, restart the session (or create via `/agents`).
5. Test explicitly first: "Use the code-reviewer agent on this diff." Check the
   returned report against the output contract.
6. Test delegation: phrase a task matching the description and confirm Claude
   delegates unprompted. If not, sharpen the description — it is the trigger,
   exactly like a skill description.
7. Iterate on the weakest link: vague reports → tighten the output contract;
   wrong delegation → tighten the description; wandering → lower `maxTurns`, narrow scope.

## When NOT to Use

- The task needs back-and-forth with the user mid-work — keep it in the main thread
- Simple lookups — a subagent round-trip costs more than doing it directly
- The "agent" is really just instructions — that's a skill

## Related Skills

- `skill-creator` — same discipline, inline instead of delegated
- `hook-creator` — deterministic enforcement around agent lifecycles
- `prompt-engineering` — the system-prompt craft this skill applies
- `claude-md-author` — session-wide memory vs per-agent prompts
