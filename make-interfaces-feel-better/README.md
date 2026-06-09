[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-make-interfaces-feel-better

A Claude Code skill with design engineering principles for making interfaces feel polished. It covers 16 named principles spanning typography, surfaces, animations, and performance — from concentric border radius to interruptible animations to minimum hit areas. Apply these when building UI components, implementing animations, or reviewing frontend code.

## Installation

```bash
mkdir -p .claude/skills/make-interfaces-feel-better
mkdir -p .claude/skills && cp -r make-interfaces-feel-better .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/make-interfaces-feel-better/SKILL.md` - UI polish principles
```

## Usage

The skill activates when working on UI polish, animations, hover states, typography, micro-interactions, or when something "feels off":

```
Make this button feel better
The animation feels jarring
Apply polish to these cards
Review the hover states
This interface needs more refinement
```

## Key Principles

- **Concentric Border Radius** — `outer = inner + padding`; mismatched radii is the most common cause of interfaces feeling off
- **Interruptible Animations** — Use CSS transitions for interactive states (can interrupt), keyframes for staged sequences
- **Stagger Enter Animations** — Break into semantic chunks, ~100ms delay between each
- **Tabular Numbers** — `font-variant-numeric: tabular-nums` for dynamic numbers to prevent layout shift
- **Scale on Press** — Exactly `scale(0.96)` for tactile button feedback; never below `0.95`
- **Never `transition: all`** — Always specify exact properties

## File Index

| File | Purpose |
|------|---------|
| `SKILL.md` | Core principles and review checklist |
| `typography.md` | Text wrapping, font smoothing, tabular numbers |
| `surfaces.md` | Border radius, shadows, outlines, hit areas |
| `animations.md` | Enter/exit transitions, icon animations, scale on press |
| `performance.md` | Transition-property discipline and `will-change` guidance |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
