---
name: writing-plans
description: Create comprehensive implementation plans from specs or requirements. Produces bite-sized tasks, exact file paths, and dependency order. Use when the user says "plan this out", "how would you build this", "break this into tasks", "write a plan", or provides a PRD/spec and wants actionable steps.
category: planning
---
# Writing Plans

Convert requirements into executable implementation plans.

## When to Use

- User provides a spec, PRD, or feature description
- Need to break complex work into ordered tasks
- User asks "how do I build this"

## Process

1. **Restate the goal** — one paragraph, in your own words. Confirm with user if ambiguous.
2. **Identify components** — list files, services, data models, and integrations needed.
3. **Order by dependency** — what must exist before what.
4. **Task breakdown** — each task is:
   - One file or one clearly isolated change
   - Verifiable by test or behavior
   - Small enough to complete in one session
5. **Add checkpoints** — after every 3–5 tasks, define what "done" looks like.

## Output Format

```markdown
# Implementation Plan: <Feature>

## Goal
...

## Task List
1. [ ] `path/to/file.ext` — description (depends on 2, 3)
...
```

## Anti-patterns

- Don't create tasks larger than one focused change
- Don't skip verification checkpoints
- Don't plan in isolation — confirm the plan shape before executing
