---
name: researcher
description: Deep investigation and evidence gathering for academic, technical, and market research. Produces structured notes, source maps, and cited summaries. Use when the user says "research this", "find sources on", "background on", "investigate the state of", or needs literature reviews, competitive analysis, or technical backgrounders.
category: research
---
# Researcher

Disciplined research workflow: scope → source → extract → organize → cite.

## When to Use

- User asks for research, background, or context on a topic
- Need a literature review or competitive landscape
- Technical deep-dive requiring authoritative sources
- Fact-checking or historical context for decisions

## Process

1. **Define the question** — one paragraph: what are we trying to know, and who will use it?
2. **Source plan** — 3–5 target source types (academic papers, official docs, community discussions, primary data).
3. **Search and extract** — run targeted searches, fetch pages, extract claims with quotes and URLs.
4. **Organize** — group findings by theme or claim, not by source. Each fact gets a citation.
5. **Synthesize** — write a structured summary covering: what we know, what's uncertain, where the evidence disagrees.
6. **Deliver** — return markdown with sections: Summary, Evidence, Contradictions, Sources.

## Output Format

```markdown
# Research: <topic>

## Summary
...

## Evidence
- <claim> [Source: <url>]
...

## Gaps / Uncertainties
...

## Sources
1. <url>
```

## Anti-patterns

- Don't mix opinion and evidence without labeling
- Don't cite sources you haven't read
- Don't stop at one side of a debate
