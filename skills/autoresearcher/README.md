# Autoresearcher

Autonomous AI agent-driven research workflow based on karpathy/autoresearch.

## Install

```bash
/plugin install autoresearcher@claude-skills
```

## Usage

"Run autoresearch on this repo", "autonomous experiment loop", "iterate overnight".

## What it does

- Modifies target file (e.g. `train.py`)
- Runs fixed-time experiments
- Evaluates and logs to TSV
- Keeps improvements, reverts failures
- Loops until human interruption
