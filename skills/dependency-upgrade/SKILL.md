---
name: dependency-upgrade
description: Safe, ordered dependency upgrades across npm, pip, and cargo ecosystems. Use when updating packages, resolving security advisories, or modernizing a lockfile. Triggers on "upgrade my dependencies", "update dependencies", "fix npm audit", "npm audit vulnerabilities", "update to React 19", "bump packages", "outdated packages", "security advisory", "Dependabot", "pip-audit", "cargo audit", "upgrade Django", or any "update package X to version Y" request.
metadata:
  tags: [dependencies, upgrades, security, npm, pip, cargo, semver, maintenance]
  tier: task-specific
  domain: tooling
when_to_apply: When upgrading existing dependencies, resolving audit findings, or planning a version bump in any package ecosystem
---

# Dependency Upgrade

Upgrades fail when they're done in bulk without a baseline. This skill enforces a strict order — security first, patches in bulk, minors in small groups, majors one at a time — with tests between every step.

## Iron Rules

1. **Never bulk-upgrade majors.** One major upgrade per step, tested before the next begins.
2. **Never upgrade without a passing baseline.** Run the test suite first. If it's already red, fix or document that before touching versions — otherwise you can't attribute failures.
3. **Lockfile always committed with the manifest change.** `package.json` + `package-lock.json`, `pyproject.toml` + the lock, `Cargo.toml` + `Cargo.lock` — same commit, every time.
4. **If tests break, fix or revert before proceeding.** Never stack a second upgrade on top of a broken one.

## Workflow

### 1. Inventory + Audit

Detect the ecosystem from lockfiles (`package-lock.json`/`yarn.lock`/`pnpm-lock.yaml` → npm; `poetry.lock`/`uv.lock`/`requirements*.txt` → pip; `Cargo.lock` → cargo), then:

| Ecosystem | Outdated | Security audit |
| --- | --- | --- |
| npm/yarn/pnpm | `npm outdated` | `npm audit` |
| pip/poetry/uv | `pip list --outdated` | `pip-audit` |
| cargo | `cargo outdated` | `cargo audit` |

Also run the test suite now to establish the passing baseline (iron rule 2).

### 2. Classify

For each candidate, record semver class (patch / minor / major) and security urgency (CVE severity if flagged by audit). Note risk signals (below).

### 3. Order the Work

1. **Security fixes first** — regardless of semver class.
2. **Patches in bulk** — one batch, one test run, one commit.
3. **Minors in small groups** — 3-5 related packages per group, test between groups.
4. **Majors ONE AT A TIME** — each gets its own research, migration, test run, and commit.

### 4. For Each Major: Research BEFORE Upgrading

- Read the changelog/release notes and migration guide for every version crossed (v3 → v5 means reading v4 *and* v5 notes).
- Search the codebase for affected APIs: grep for the package's imports and every API the changelog marks removed/renamed/changed.
- List the call sites and plan the migration (codemod available? mechanical rename? behavioral change needing review?).
- Only then bump the version and apply the migration.

### 5. Test Between Every Step

Full suite after every batch/group/major (cross-reference the test-runner skill). Also build and typecheck if the project has them — type errors surface breaking changes tests miss.

### 6. One Commit Per Logical Upgrade

Per the commit-hygiene skill: security batch, patch batch, each minor group, and each major are separate commits. Message names packages and versions, e.g. `chore(deps): upgrade react 18.3.1 → 19.0.0`. Lockfile included (iron rule 3).

## Risk Signals

Treat as high-risk even when semver says "minor":

- **Major version bump** — breaking changes by definition.
- **Pre-1.0 minor** (0.x → 0.y) — semver allows breaking changes here.
- **Native bindings** (node-gyp, C extensions, `-sys` crates) — rebuild/ABI/platform failures.
- **Framework or runtime upgrades** (React, Django, Rails, Node, Python version) — ecosystem-wide ripple; peer deps and plugins must move together.
- **Transitive-only fixes** — vulnerability in a sub-dependency the direct dep hasn't picked up; needs `overrides` (npm), `resolutions` (yarn), or constraint pins, and a note to remove the override once upstream catches up.

## Output Format

First present the plan as a table, get it sanity-checked, then execute:

```
| Package | Current → Target | Semver | Risk | Breaking changes |
| ------- | ---------------- | ------ | ---- | ---------------- |
| lodash  | 4.17.20 → 4.17.21 | patch | low (security: CVE-2021-23337) | none |
| eslint  | 8.57.0 → 9.4.0    | major | high | flat config required; .eslintrc removed |
```

Then per execution step: what was upgraded, test result (pass/fail + suite name), commit made. On failure: what broke, and whether it was fixed or reverted.

## When NOT to Use

- **Adding new dependencies** — that's a selection decision (license, maintenance health, bundle size), not an upgrade.
- **Monorepo-wide coordinated upgrades** — shared-version policies across many packages need human planning before mechanical execution.

## Checklist

- [ ] Ecosystem detected from lockfiles; outdated + audit run
- [ ] Baseline test suite passing before any change
- [ ] Plan table presented: package, current → target, semver class, risk, breaking changes
- [ ] Security fixes applied first
- [ ] Patches batched; minors in groups of 3-5; majors strictly one at a time
- [ ] Changelog + migration guide read before every major; call sites listed
- [ ] Tests run after every step; failures fixed or reverted before continuing
- [ ] Lockfile committed with manifest in every commit; one commit per logical upgrade

## Related Skills

- [commit-hygiene](../commit-hygiene/SKILL.md) — commit sizing and message format for upgrade commits
- [test-runner](../test-runner/SKILL.md) — running the suite between upgrade steps
- [precommit-validation](../precommit-validation/SKILL.md) — final validation before each upgrade commit
