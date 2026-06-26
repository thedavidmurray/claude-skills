---
name: browser-automation-patterns
description: Reliable browser automation patterns for web UI tasks. Selector strategy, wait/retry loops, navigation safety, form filling, and screenshot-based verification. Use when automating UI flows, clicking through dashboards, or scripting web interactions.
category: tooling
---
# Browser Automation Patterns

Make browser automation reliable and maintainable.

## When to Use

- Automating multi-step UI flows
- Scraping content behind login or interaction
- Scripting admin dashboard tasks

## Principles

1. **Selector strategy** — prefer `data-testid`, then ARIA labels, then stable CSS classes. Never use auto-generated IDs.
2. **Wait, don't sleep** — wait for network idle, element visible, or URL change.
3. **Retry with backoff** — flaky elements get 2 retries with 500ms backoff.
4. **One action per step** — click, wait, assert; don't chain blindly.
5. **Screenshot checkpointing** — screenshot after every risky action.

## Process

1. Map the flow as a numbered checklist
2. Implement each step with explicit waits
3. Add assertions after state changes
4. Run headless first, then verify headed

## Anti-patterns

- Don't use fixed `sleep()` — always wait for conditions
- Don't select by text that changes (timestamps, IDs)
- Don't run long flows without checkpoint screenshots
