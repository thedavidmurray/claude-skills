---
name: autoresearcher
description: Autonomous AI agent-driven research workflow based on karpathy/autoresearch. The agent modifies code/experiments, runs them, evaluates results, logs to TSV, and iterates autonomously until stopped. Use when the user says "autoresearch this", "run overnight experiments", "autonomous research loop", or needs an AI agent to iterate on experiments without human intervention.
category: research
---
# Autoresearcher

Autonomous research loop: modify → run → evaluate → record → iterate.

## Based on

karpathy/autoresearch. Clone it for reference:
```bash
git clone https://github.com/karpathy/autoresearch.git
```

## When to Use

- User asks for autonomous research or overnight experiments
- Need an agent to iterate on training/experiments continuously
- Goal is to maximize a metric with minimal human oversight

## Core Loop

1. **Setup** — agree on run tag, create branch, read in-scope files, verify data, initialize results.tsv.
2. **Experiment** — modify the target file (usually `train.py`), commit, run.
3. **Evaluate** — read results from log output or evaluation script.
4. **Log** — append tab-separated results to `results.tsv`. DO NOT commit this file.
5. **Iterate** — if improved, keep; if not, revert. Loop until stopped.

## Rules

- Only modify the designated file(s). Do not touch README, setup, or evaluation harness.
- Respect time budgets. Each run has a fixed wall-clock limit.
- Log every attempt, including crashes.
- Record short descriptions for every experiment.
- Never stop automatically — loop until human interruption, unless explicitly told to stop after N iterations.

## Output Format

Update `results.tsv` after each run:
```
commit	metric	peak_memory	status	description
```

Post periodic progress summaries to the user channel.

## Anti-patterns

- Don't modify evaluation harness or add dependencies
- Don't ask "should I continue?" during the loop
- Don't stop after a few tries — the value is in volume
