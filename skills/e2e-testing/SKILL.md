---
name: e2e-testing
description: Playwright end-to-end testing patterns, Page Object Model, CI/CD integration, and flaky test strategies. Use when the user says "write e2e tests", "add UI tests", "playwright", or needs end-to-end test scaffolding for web apps.
category: testing
---
# E2E Testing

Playwright patterns for reliable end-to-end tests.

## When to Use

- User says "e2e tests" or "UI tests"
- Need to verify user flows across pages
- CI pipeline needs browser-based regression coverage

## Stack

- Playwright (Chromium, Firefox, WebKit)
- Page Object Model (POM) per feature
- Base URL, timeout, and retry policy in one config file

## Process

1. **Define critical paths** — signup, checkout, dashboard load, settings save.
2. **Page objects** — one class per page/route with methods like `login(email, pass)`.
3. **Tests** — one behavior per test. Arrange via page object, act, assert on DOM or URL.
4. **Flakiness guard** — auto-retry once; if still flaky, tag and fix within 24h.

## Anti-patterns

- Don't test implementation details (DOM structure, class names) — test behavior
- Don't run e2e for everything — unit tests cover logic cheaper
- Don't leave flaky tests in CI
