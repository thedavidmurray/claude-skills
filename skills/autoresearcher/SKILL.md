---
name: autoresearcher
description: Autonomous deep research with Mixture-of-Experts routing. Spawns parallel research lanes, gathers evidence from web and local sources, synthesizes findings into cited reports. Use when the user says "autoresearch", "deep research", "investigate this topic", "map the landscape", or needs comprehensive multi-source analysis across technical, market, or academic domains.
category: research
---
# Autoresearcher

Autonomous research engine for Claude Code. Splits a topic into parallel lanes, gathers evidence, and synthesizes into a cited report.

## When to Use

- User says "autoresearch X" or "do deep research on X"
- Need a comprehensive literature / market / technical landscape review
- Multi-source synthesis where single-pass research misses information
- Time-sensitive fact-finding across disparate sources

## Process

1. **Clarify the question** — restate as a research brief (scope, sources, depth).
2. **Decompose into lanes** — 3–6 independent sub-queries that cover the topic from different angles.
3. **Gather evidence** — run lanes in parallel using available tools: web search, URL extraction, local vault, Obsidian notes, file system.
4. **Synthesize** — merge lane findings into one report, preserving per-source attribution.
5. **Quality gate** — check coverage, identify gaps, run supplemental queries if needed.
6. **Deliver** — return a markdown report with executive summary, findings by lane, sources, and open questions.

## Output Format

```markdown
# Research: <topic>

## Executive Summary
...

## Findings
### Lane 1: <angle>
...

## Sources
- ...
```

## Anti-patterns

- Don't run one big query and hope it covers everything
- Don't drop source attribution when synthesizing
- Don't stop at the first page of results
