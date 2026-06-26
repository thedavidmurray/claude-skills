---
name: autoreason
description: Apply structured reasoning frameworks to complex problems. Produces decomposed plans, evidence-backed analysis, and verifiable conclusions. Use when the user says "run autoreason", "deep reasoning", "break this down", "structured analysis", or faces multi-step decisions requiring rigorous decomposition.
category: claude-extensions
---
# Autoreason

Apply a disciplined reasoning chain: decompose → evidence → analyze → conclude → verify.

## When to Use

- User says "autoreason on this" / "run autoreason"
- Multi-factor decisions where gut instinct isn't enough
- Complex systems needing architecture or root-cause analysis
- Research synthesis requiring evidence-backed conclusions

## Process

1. **Clarify scope** — one sentence: what question or decision are we resolving?
2. **Decompose** — split into 3–7 independent sub-problems or hypotheses.
3. **Gather evidence** — for each sub-problem, list what we know, what we need, and where to find it.
4. **Analyze** — apply the right frame per sub-problem (first principles, analogy, constraint check, decision matrix).
5. **Synthesize** — recombine sub-results into a single recommendation with stated assumptions and confidence.
6. **Verify** — list falsification tests. What would change the conclusion?

## Output Format

```markdown
## Autoreason: <topic>

### Scope
...

### Decomposition
1. ...
2. ...

### Evidence & Analysis
...

### Synthesis
...

### Verification
- [ ] ...
```

## Anti-patterns

- Don't skip decomposition because "it's all one problem"
- Don't present opinion as conclusion without evidence
- Don't ignore falsification tests
