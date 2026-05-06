[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-prompt-engineering

A Claude Code skill with advanced prompt engineering patterns for maximizing LLM performance, reliability, and controllability. It covers few-shot learning, chain-of-thought prompting, template systems, system prompt design, and persuasion principles for agent communication. It also documents common anti-patterns to avoid (over-explanation, politeness overhead, redundant instructions).

## Installation

```bash
mkdir -p .claude/skills/prompt-engineering
cp -r prompt-engineering/ .claude/skills/prompt-engineering/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/prompt-engineering/skill.md` - Prompt engineering patterns
```

## Usage

The skill activates when writing agent instructions, hooks, skills, or any LLM-facing prompts:

```
Write a system prompt for a code review agent
Optimize this prompt for better reliability
Design a template for extracting structured data
Help me write instructions for a sub-agent
```

## Core Patterns

1. **Few-Shot Learning** — Teach with examples, not rules
2. **Chain-of-Thought** — Request step-by-step reasoning
3. **Instruction Hierarchy** — `[System Context] → [Task] → [Examples] → [Input] → [Output Format]`
4. **Progressive Disclosure** — Start simple, add complexity only when needed
5. **Error Recovery** — Fallback instructions, confidence scores, partial success

## The Conciseness Rule

Only add context Claude doesn't already have. The context window is a shared resource — every token costs.

## File Index

| File | Purpose |
|------|---------|
| `skill.md` | Main patterns and principles |
| `references/persuasion-principles.md` | Persuasion techniques for agent compliance |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
