---
name: autoreason
description: Iterative self-refinement that knows when to stop, based on NousResearch/autoreason. Produces three competing versions per iteration — unchanged incumbent (A), adversarial revision (B), synthesis (AB) — judged by fresh agents via blind Borda count. "Do nothing" is always a first-class option. Use when the user says "autoreason", "refine this", "self-improve", or needs high-quality output where critique-and-revise alone destroys weak models.
category: claude-extensions
---
# Autoreason

Self-refinement with structural safeguards against prompt bias, scope creep, and lack of restraint.

## Based on

NousResearch/autoreason. Read the paper and tasks there for methodology details:
```bash
git clone https://github.com/NousResearch/autoreason.git
```

## When to Use

- User says "autoreason" or "run autoreason on this"
- Need iterative improvement without the usual critique-and-revise failure modes
- High-stakes output where weaker models degrade under critique pressure
- Output quality needs to converge, not drift

## Method

Each iteration produces **three competing versions**:

| Version | Description |
|---------|-------------|
| **A** | The unchanged incumbent — always an option |
| **B** | An adversarial revision — fresh agent, no shared context |
| **AB** | A synthesis of A and B — fresh synthesizer agent |

Then a **judge panel** of 3 fresh agents scores blindly via Borda count.

### Iteration Rules

1. Start with current best output as A.
2. Spawn fresh agents for critic, author, synthesizer — no shared context with previous passes.
3. Collect A, B, AB.
4. 3 fresh judges score blindly (Borda count). Winner becomes new A.
5. If A wins 2 consecutive times → converge. Stop.
6. Maximum iterations: 5 (configurable). Minimum: 1 if converged early.

### Anti-failure Design

- **Prompt bias prevention**: Judges are fresh agents with no shared context. They don't see the history.
- **Scope creep prevention**: A is always the unchanged incumbent. If B/AB expand unnecessarily, A still wins.
- **Restraint enforcement**: "Do nothing" is a first-class option. A winning 2× means "this is good enough."

## Output Format

```markdown
## Autoreason Result

**Input:** <original prompt/output>
**Iterations:** N
**Final score:** <Borda count>
**Winner:** A / B / AB

### Final Output
<winning version>

### Convergence Log
- Iteration 1: A wins (criterion)
- Iteration 2: B wins (criterion)
- Iteration 3: A wins (converged)
```

## Agent Roles

When running autoreason, spawn separate agents for each role:
- **Incumbent**: produces/retains A
- **Critic**: produces B from critique of A
- **Synthesizer**: produces AB by combining A and B
- **Judges**: 3 independent scorers (Borda count)

## Anti-patterns

- Don't run critique-and-revise (single-pass refinement) — it's not autoreason
- Don't reuse judges across iterations — they carry bias
- Don't force convergence — let the Borda count decide when to stop
