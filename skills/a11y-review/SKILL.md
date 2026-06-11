---
name: a11y-review
description: Accessibility review for web UIs against checkable WCAG 2.2 AA rules. Use when building or reviewing frontend components, forms, modals, navigation, or any HTML/CSS/JS change that users interact with. Triggers on "is this accessible", "a11y review", "accessibility audit", "check accessibility", "screen reader support", "keyboard navigation", "WCAG", "color contrast", alt text, focus states, ARIA attributes, semantic HTML, form labels, or skip links.
metadata:
  tags: [a11y, accessibility, wcag, frontend, ui, review, aria, keyboard]
  tier: task-specific
  domain: creative
when_to_apply: When a web UI change needs an accessibility review or when writing new interactive frontend code
---

# Accessibility Review

Accessibility is checkable, not aspirational. Every rule below has a concrete pass/fail condition. Apply them when writing or reviewing web UI code.

## Core Rules

### 1. Native Elements Over div+ARIA

The first rule of ARIA: don't use ARIA when a native element exists. `<button>`, `<a href>`, `<select>`, `<input type="checkbox">`, `<dialog>`, `<details>` ship keyboard handling, focus, and semantics for free. A `<div role="button" tabindex="0">` needs onKeyDown for Enter *and* Space to match — almost nobody gets it right.

### 2. Everything Reachable by Keyboard

Every interactive element must be reachable with Tab, in an order that follows the visual layout. No `tabindex` greater than `0` — it hijacks the natural order. No keyboard traps: Tab must always be able to leave a widget.

### 3. Visible Focus Indicator

Never `outline: none` (or `outline: 0`) without a replacement of at least equal visibility. Focus indicators need 3:1 contrast against the background. Prefer `:focus-visible` so mouse clicks don't show rings but keyboard focus always does.

### 4. Escape Closes Overlays

Modals, popovers, and menus close on Escape and return focus to the element that opened them. Modals trap Tab inside while open (`<dialog>.showModal()` does this for free).

### 5. Arrow Keys for Composite Widgets

Tabs, radio groups, menus, comboboxes, and grids use arrow keys to move within the widget and a single Tab stop to enter/leave it (roving tabindex or `aria-activedescendant`). Tab-through-every-option is a failure for any group larger than ~3 items.

### 6. Contrast Minimums (WCAG 2.2 AA)

- Normal text: **4.5:1** against its background.
- Large text (≥24px, or ≥18.66px bold): **3:1**.
- UI component boundaries, icons, and focus indicators: **3:1**.
- Don't trust your eyes — compute it (browser devtools show the ratio).

### 7. Alt Text Rules

- Informative images: alt describes the content or function. Never start with "image of" or "picture of" — screen readers already announce the role.
- Decorative images: `alt=""` (empty, not missing) so they're skipped.
- Icon-only buttons: accessible name via `aria-label` or visually hidden text.
- Video: captions. Audio-only: transcript.

### 8. Every Input Has a Programmatic Label

Use `<label for>` or wrapping `<label>`. Placeholder is not a label — it vanishes on input and usually fails contrast. Errors are linked to their field via `aria-describedby` and the invalid field gets `aria-invalid="true"`. Never signal errors with color alone — pair red with an icon or text.

### 9. Document Structure

Exactly one `<h1>` per page. No skipped heading levels (h2 → h4 is a failure). Landmarks present: `<main>`, `<nav>`, `<header>`, `<footer>`. Every page has a descriptive `<title>` and `<html lang="…">`.

### 10. Respect prefers-reduced-motion

Wrap non-essential animation in `@media (prefers-reduced-motion: no-preference)`. Motion details and animation craft live in [make-interfaces-feel-better](../make-interfaces-feel-better/SKILL.md) — this rule is the accessibility floor.

### 11. Touch Targets

Minimum **24×24px** (WCAG 2.2 AA), **44×44px** recommended. Extend with padding or a pseudo-element if the visual element is smaller; don't let adjacent targets overlap.

### 12. ARIA States Must Track Reality

- Disclosure/menu/accordion triggers toggle `aria-expanded="true|false"`.
- Tabs and options toggle `aria-selected`; toggles use `aria-pressed` or `aria-checked`.
- Async updates (toasts, "saved", search-result counts) announce via a live region: `role="status"` (polite) or `role="alert"` (assertive).
- No redundant roles: `<button role="button">` and `<nav role="navigation">` are noise.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| `<div onClick>` as a button | Use `<button>`; if impossible, add `role="button"`, `tabindex="0"`, Enter + Space handlers |
| `outline: none` with no replacement | Style `:focus-visible` with a ≥3:1 indicator instead |
| Placeholder used as the only label | Add `<label for>`; keep placeholder as a hint only |
| `alt="image of a chart showing sales"` | `alt="Sales rose 40% from Jan to Mar"` — content, not "image of" |
| Decorative image with no alt attribute | `alt=""` so screen readers skip it |
| Error shown only by red border | Add error text linked via `aria-describedby` + `aria-invalid="true"` |
| Modal that ignores Escape | Close on Escape, trap Tab, restore focus to the trigger |
| `tabindex="3"` to "fix" order | Remove positive tabindex; fix DOM order instead |
| Heading chosen for its font size | Pick the level for hierarchy; restyle with CSS |
| Dropdown trigger without `aria-expanded` | Toggle `aria-expanded` on open/close |
| Toast appears with no announcement | Render into a persistent `role="status"` live region |
| Gray-on-gray placeholder/hint text | Verify 4.5:1; darken until it passes |

## Review Workflow

1. **Keyboard-only pass.** Unplug the mouse. Tab through the changed UI: reach everything, see focus at every stop, operate every control, Escape out of every overlay, confirm no traps.
2. **Semantic/ARIA audit of the diff.** Read the changed markup for rules 1, 7, 8, 9, 12 — native elements, labels, alt text, heading levels, ARIA state wiring.
3. **Contrast check.** Compute ratios for new/changed text, icons, and focus indicators against rule 6.
4. **Automated scan (optional tooling).** If axe-core or pa11y is available (`npx pa11y <url>`, axe DevTools, `@axe-core/cli`), run it to catch what manual passes missed. Automated tools find ~30-40% of issues — they supplement, never replace, steps 1-3.
5. **Report** in the output format below.

## Output Format

Group findings by severity, each with file/line, the failing rule, and a concrete fix:

- **Blocker** — WCAG A failure, or unusable by keyboard or screen reader (unreachable control, missing form label, keyboard trap, missing alt on informative image).
- **Serious** — WCAG AA failure (contrast below minimum, missing focus indicator, skipped heading level, no reduced-motion guard).
- **Polish** — best-practice gaps (44px targets, better alt phrasing, redundant roles).

End with the count per severity and a one-line verdict.

## When NOT to Use

- Non-web UIs (native mobile, desktop toolkits, TUIs) — different standards and APIs apply.
- Backend code, APIs, CLIs, or changes with no rendered UI.

## Review Checklist

- [ ] Native elements used instead of div+ARIA where one exists
- [ ] Everything interactive reachable by Tab, logical order, no positive tabindex
- [ ] Visible `:focus-visible` indicator, ≥3:1 contrast, no bare `outline: none`
- [ ] Escape closes overlays; focus returns to trigger; modals trap Tab
- [ ] Composite widgets use arrow keys with a single Tab stop
- [ ] Text contrast ≥4.5:1 (≥3:1 for large text and UI components)
- [ ] Informative images have content-bearing alt; decorative use `alt=""`
- [ ] Every input has a programmatic label; errors via `aria-describedby`, never color-only
- [ ] One h1, no skipped levels, landmarks, page title, `lang` attribute
- [ ] Non-essential motion gated behind `prefers-reduced-motion`
- [ ] Touch targets ≥24×24px (44px preferred)
- [ ] `aria-expanded`/`aria-selected` track state; async updates use live regions; no redundant roles

## Related Skills

- [make-interfaces-feel-better](../make-interfaces-feel-better/SKILL.md) — polish and motion craft, including reduced-motion details
- [code-review](../code-review/SKILL.md) — general correctness review; run a11y-review alongside it for UI diffs
