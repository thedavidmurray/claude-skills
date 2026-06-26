# Autoreason

Iterative self-refinement skill for Claude Code based on NousResearch/autoreason.

## Install

```bash
/plugin install autoreason@claude-skills
```

## Usage

"Run autoreason on this", "refine with Borda judges", "self-improve until convergence".

## Method

Each iteration produces 3 versions: unchanged incumbent (A), adversarial revision (B), synthesis (AB). Fresh judges score via blind Borda count. "Do nothing" is always an option. Stops when A wins 2 consecutive times.
