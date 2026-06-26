# Browser Automation Patterns

Reliable browser automation patterns for Claude Code.

## Install

```bash
/plugin install browser-automation-patterns@claude-skills
```

## Core rules

- Selectors: data-testid > ARIA > stable class
- Wait: conditions, not sleep
- Retry: 2 attempts with backoff
- Screenshot: after every risky step
