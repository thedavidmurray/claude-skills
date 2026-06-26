---
name: playwright
description: Browser automation using Playwright — navigate, scrape, test, and automate web interactions. Use when the user says "playwright", "open a browser", "automate this website", "scrape with playwright", or needs reliable browser automation in Python or CLI.
category: tooling
---
# Playwright

Reliable browser automation with Playwright.

## When to Use

- User asks for Playwright specifically
- Need headless or headed browser automation
- Scraping dynamic content requiring interaction
- Automated UI testing outside a dedicated E2E framework

## Process

1. **Install** — `npx playwright install chromium`
2. **Script** — use Python `playwright.sync_api` or CLI `playwright codegen`
3. **Navigate** — `page.goto(url)`, wait for network idle or selector
4. **Interact** — click, fill, select; prefer data-testid selectors
5. **Extract** — text, HTML, screenshots, PDF
6. **Cleanup** — close browser; use context managers

## Anti-patterns

- Don't rely on CSS classes for selectors — use `data-testid`
- Don't forget timeouts on dynamic content
- Don't automate CAPTCHAs — use APIs instead
