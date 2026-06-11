---
name: git-rescue
description: Recovery and investigation procedures for git disasters. Covers reflog recovery, undoing bad merges and rebases, recovering deleted branches and reset-away work, fsck for destroyed uncommitted changes, secret removal, and git bisect for regression hunting. Use when user says "I lost my commits", "undo this rebase", "I reset --hard by accident", "committed to the wrong branch", "I deleted a branch I needed", "undo this merge", "I committed a secret", "which commit broke this", or any panic about lost git work.
metadata:
  tags: [git, recovery, reflog, bisect, incident]
  tier: task-specific
  domain: product
when_to_apply: When git work appears lost or history needs surgery — inventory first, create a backup ref, then run the matching recovery procedure
---
# Git Rescue

## Overview

Almost nothing in git is truly lost: commits survive in the reflog for ~90 days, and even unreferenced blobs linger until gc. The danger is not the disaster — it's a panicked second command that overwrites the evidence.

**Core principle:** inventory before action, backup ref before surgery.

## The Iron Law

```
BEFORE ANY HISTORY SURGERY: CREATE A BACKUP REF AND CHECK IF THE BRANCH IS SHARED
```

```bash
git branch backup/rescue-$(date +%Y%m%d-%H%M)        # backup ref — or at minimum note the SHA
git log --oneline -1                                  # record where you are
git branch -r --contains HEAD                         # is this history pushed?
```

If the branch is pushed and others may have pulled it: **never rewrite without coordinating.** Prefer additive fixes (`git revert`) over rewrites (`git reset`, `git rebase`) on shared branches. A force-push to shared history turns one person's disaster into the team's.

## Inventory First

If the user is unsure what was lost, do **not** act yet. Build the picture:

```bash
git reflog --date=iso | head -40        # every place HEAD has been
git fsck --lost-found                   # dangling commits and blobs
git stash list                          # work sometimes hides here
git status && git log --oneline -10     # current state
```

State what you found before touching anything (see Output Format).

## Scenario → Procedure

| Scenario | Procedure |
|----------|-----------|
| Lost commits (any cause) | Find SHA in `git reflog`, then `git branch recovered <sha>` |
| Committed to wrong branch | `git switch correct-branch && git cherry-pick <sha>...`, then remove from the wrong branch |
| Undo a bad merge (just made, not pushed) | `git reset --hard ORIG_HEAD` ⚠️ |
| Undo a bad merge (pushed) | `git revert -m 1 <merge-sha>` — additive, safe to push |
| Botched rebase | `git reset --hard <pre-rebase-sha from reflog>` ⚠️ — reflog entry reads `rebase (start)`; the SHA *before* it is your original tip |
| Accidental `reset --hard` (committed work) | `git reflog`, then `git reset --hard HEAD@{1}` ⚠️ (verify the entry first) |
| Recover deleted branch | `git reflog` → find branch tip SHA → `git branch <name> <sha>` |
| Detached HEAD with commits on it | `git branch rescue-detached <sha-or-HEAD>` **before** switching away |
| Staged/unstaged work destroyed | Staged: `git fsck --lost-found` dangling blobs → `git show <blob-sha>`. Unstaged & never added: git never saw it — try editor history/local backups. Last resort, low odds. |
| Committed secrets | `git filter-repo` + **ROTATE THE SECRET** (below) |
| "Which commit broke this?" | `git bisect` (below) |

⚠️ = destructive: only after a backup ref exists, never on shared history.

### Wrong branch, expanded

```bash
git switch correct-branch
git cherry-pick <sha>                       # or <oldest-sha>^..<newest-sha> for a range
git switch wrong-branch
git reset --hard HEAD~1                     # ⚠️ unpushed only; if pushed: git revert <sha>
```

### Committed secrets

Rewriting history is the *second* most important step. **Rotation matters more than rewriting**: assume the secret is compromised the moment it was pushed — clones, forks, CI logs, and scrapers already have it. Removing it from history only stops *future* leakage.

1. **Rotate/revoke the credential immediately.** Not optional, not after cleanup — first.
2. If pushed only seconds ago and unpulled, a quick amend may suffice: `git rm --cached <file> && git commit --amend && git push --force-with-lease` ⚠️
3. Otherwise rewrite: `git filter-repo --invert-paths --path <file>` (or `--replace-text expressions.txt` for in-file strings), then coordinate force-push and team re-clones.
4. Add the path to `.gitignore`; consider a pre-commit secret scan (see commit-hygiene's sensitive-file blocking).

## git bisect — Regression Hunting as a Feedback Loop

Bisect is the diagnose skill's Phase 1 applied to history: given a pass/fail signal, it finds the breaking commit in log₂(n) steps. Build the sharp, fast check first (see diagnose) — bisect just consumes it.

```bash
git bisect start
git bisect bad                  # current commit is broken
git bisect good v2.3.0          # last known-good ref
# git checks out a midpoint; test it, then: git bisect good | bad | skip
```

**Automate whenever the check is scriptable** — exit 0 = good, 1-127 (except 125) = bad, 125 = skip:

```bash
git bisect run npm test -- --filter="checkout total"
git bisect reset                # always reset when done (returns to original HEAD)
```

A flaky test ruins bisection — make the signal deterministic first (diagnose Phase 1), or wrap it: run 10×, fail if any fail.

## When NOT to Use / Escalate

- **Shared-history rewrites**: do not force-push rewritten history to a branch others use without explicit coordination (announce, agree on a re-clone/reset plan). Offer `git revert` instead.
- **User unsure what was lost**: inventory first (reflog/fsck), report, get confirmation. Acting on a guess can overwrite the only remaining copy.
- **`git gc` / `git prune` mid-rescue**: never. They delete exactly the dangling objects you're trying to recover.
- **The repo itself is corrupt** (`fsck` errors, missing objects): stop, copy the entire `.git` directory to a safe location, then escalate — recovery tooling beyond git may be needed.

## Verification Checklist

- [ ] Backup ref created (or SHA recorded) before any destructive command
- [ ] Checked whether affected history is pushed/shared
- [ ] Recovered content verified (`git log`, `git diff backup/...`) — not just "command succeeded"
- [ ] No `gc`/`prune` run during the rescue
- [ ] For secrets: credential rotated, not merely deleted from history
- [ ] `git bisect reset` run if bisect was used
- [ ] Backup ref kept until the user confirms everything is restored

## Output Format

Report before executing, then execute:

```
What was lost: 3 commits (a1b2c3d..f4e5d6a) orphaned by `git reset --hard
origin/main` on feature/checkout; reflog confirms all three reachable.

Recovery plan:
1. Backup ref: git branch backup/rescue-20260609-1432
2. git branch recovered-checkout f4e5d6a
3. Verify: git log --oneline backup/rescue-20260609-1432..recovered-checkout
4. Fast-forward feature/checkout to recovered tip (unpushed — safe)

Shared-history check: feature/checkout never pushed → local surgery is safe.

Executing...
```

## Related Skills

- `commit-hygiene` — small clean commits make every rescue easier; secret blocking prevents the worst scenario here
- `diagnose` — feedback-loop construction; `git bisect` is that loop pointed at history
