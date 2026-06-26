---
name: goal-loop
description: Self-evaluating goal loop for autonomous execution. Plan > act > test > review > iterate. Use when the user says "goal loop", "keep working on this", "autonomous loop", "self-evaluating task", or asks Claude to keep iterating until a goal is satisfied.
category: claude-extensions
---
# Goal Loop

Run a bounded self-evaluating loop: create a plan, take actions, verify results, and iterate.

## When to Use

- User wants autonomous progress on a task
- Need bounded retry until acceptance criteria met
- Complex multi-step work where blind execution fails

## Process

1. **Plan** — define the goal, acceptance criteria, and max 5 cycles.
2. **Act** — execute one step, prefer reversible actions.
3. **Test** — verify the step met its criterion.
4. **Review** — assess progress toward goal.
5. **Iterate** — if not done and cycles remain, return to Act.

## Output Format

Each iteration returns:
- Cycle: N/M
- Action taken
- Test result: PASS / FAIL
- Overall progress: X%
- Blockers (if any)

## Anti-patterns

- Don't exceed 5 cycles without explicit user approval
- Don't skip the review step
- Don't take irreversible actions without a checkpoint
