---
name: proof-of-completion
description: Structured proof-of-completion framework for agent task delivery. Agents must include a proof block in every completed task. Use when marking tasks done, submitting deliverables, or when the user asks "prove it's done" / "show completion".
category: testing
---
# Proof of Completion

Every completed task must include verifiable evidence of completion.

## When to Use

- Marking a task or issue complete
- Submitting work for review
- User asks "how do I know it's done"

## Required Proof Block

```markdown
## Proof of Completion

- **Files changed:** <list of paths or "none">
- **Commands run:** <actual commands + exit status>
- **Verification:** <how you confirmed it works>
- **Status:** COMPLETE / PARTIAL / BLOCKED
```

## Verification Options

Pick the strongest available:

1. **Command output** — the command that proves it (build passes, test runs, server responds)
2. **File content** — exact bytes showing the new code/state
3. **Live check** — HTTP 200, health endpoint, UI loads
4. **Screenshot / log** — for UI or visual deliverables

## Anti-patterns

- Don't claim done without any verification
- Don't use vague statements ("looks good", "should work")
- Don't complete work that was asked but not verified
