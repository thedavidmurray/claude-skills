# Example Output — claude-changelog-generator

This file shows sample output for three invocation modes.

---

## Example 1: Release Notes (Markdown, default style)

**Invocation**: `/changelog v2.4.0..v2.5.0`

**Raw commits in this range:**
```
feat(workspaces): add team workspaces with member invitations
feat(shortcuts): add keyboard shortcut overlay (press ? to open)
perf(sync): batch file writes to reduce round-trip latency
perf(search): build trigram index on first open for faster results
fix(upload): prevent hang when uploading files larger than 500 MB
fix(scheduler): correct UTC offset for users in half-hour timezones
fix(search): return no results instead of crashing on empty index
docs(api): add rate-limit headers to API reference
refactor(core): extract file-watcher into separate module
test(upload): add integration tests for chunked upload path
chore: bump dependencies to latest patch versions
```

---

```markdown
# Release v2.5.0 — 2025-06-15

## New Features

- **Team Workspaces**: Create separate workspaces for different projects and invite
  team members to collaborate.
- **Keyboard Shortcuts**: Press `?` anywhere in the app to see all available
  keyboard shortcuts and navigate without touching your mouse.

## Performance

- Sync is now significantly faster — file writes are batched to reduce server
  round-trips.
- Search results appear instantly after the first open thanks to a pre-built
  trigram index.

## Bug Fixes

- Fixed a hang that occurred when uploading files larger than 500 MB.
- Resolved incorrect scheduling times for users in half-hour UTC offset timezones
  (e.g. IST, NST).
- Fixed a crash in search that occurred when the index was empty.

## Documentation

- API reference now documents rate-limit response headers.
```

---

## Example 2: Weekly Update Summary (brief style)

**Invocation**: `/changelog --since "7 days ago" --style brief`

```markdown
# Updates — Week of 9 June 2025

## New Features

- Added support for two-factor authentication via authenticator apps.
- Introduced a compact list view as an alternative to the card layout.

## Bug Fixes

- Fixed login failure for accounts with special characters in their email address.
- Resolved a display glitch on the settings page in Safari.

## Performance

- Dashboard load time reduced by ~35% for accounts with many projects.
```

---

## Example 3: Breaking Change Release (detailed style)

**Invocation**: `/changelog v3.0.0-beta..v3.0.0 --style detailed`

```markdown
# Release v3.0.0 — 2025-07-01

## Breaking Changes

- **[Breaking] Authentication endpoint moved to `/v2/auth`**
  The legacy `/v1/auth` endpoint has been removed. All clients must update their
  base URLs before upgrading. See the [migration guide](https://example.com/migrate)
  for step-by-step instructions.

- **[Breaking] API keys now expire after 90 days**
  Previously, API keys had no expiry. Keys created before this release will expire
  on 2025-09-29. Rotate your keys in the dashboard under Settings → API Keys.

## New Features

- **Granular Permissions**: Assign read-only, read-write, or admin roles to individual
  team members within each workspace. Previously all members shared the same access level.

- **Audit Log**: Every permission change, data export, and login event is now recorded
  in the audit log, accessible from Settings → Security.

## Bug Fixes

- Fixed a race condition that caused duplicate notifications to be sent when two users
  edited the same record within the same second.

## Security

- All session tokens are now rotated on privilege escalation to prevent session fixation
  attacks.
```

---

## Example 4: JSON output

**Invocation**: `/changelog v2.4.0..v2.5.0 --format json`

```json
{
  "version": "2.5.0",
  "date": "2025-06-15",
  "range": "v2.4.0..v2.5.0",
  "categories": {
    "breaking_changes": [],
    "new_features": [
      {
        "hash": "a1b2c3d",
        "raw": "feat(workspaces): add team workspaces with member invitations",
        "rewritten": "Team Workspaces — Create separate workspaces for different projects and invite team members.",
        "scope": "workspaces",
        "author": "Jane Smith",
        "date": "2025-06-12"
      },
      {
        "hash": "e4f5a6b",
        "raw": "feat(shortcuts): add keyboard shortcut overlay (press ? to open)",
        "rewritten": "Keyboard Shortcuts — Press ? anywhere to see all available shortcuts.",
        "scope": "shortcuts",
        "author": "Alex Johnson",
        "date": "2025-06-10"
      }
    ],
    "bug_fixes": [
      {
        "hash": "c7d8e9f",
        "raw": "fix(upload): prevent hang when uploading files larger than 500 MB",
        "rewritten": "Fixed a hang that occurred when uploading files larger than 500 MB.",
        "scope": "upload",
        "author": "Maria Garcia",
        "date": "2025-06-14"
      }
    ],
    "performance": [
      {
        "hash": "0a1b2c3",
        "raw": "perf(sync): batch file writes to reduce round-trip latency",
        "rewritten": "Sync is now significantly faster due to batched file writes.",
        "scope": "sync",
        "author": "Chris Lee",
        "date": "2025-06-11"
      }
    ],
    "security": [],
    "documentation": [],
    "deprecations": [],
    "reverts": [],
    "other": []
  }
}
```

---

## Example 5: HTML output (abbreviated)

**Invocation**: `/changelog v2.4.0..v2.5.0 --format html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Changelog — v2.5.0</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; color: #1a1a1a; }
    h1 { border-bottom: 2px solid #e5e5e5; padding-bottom: 0.5rem; }
    h2 { margin-top: 2rem; color: #2d2d2d; }
    ul { padding-left: 1.5rem; }
    li { margin-bottom: 0.4rem; line-height: 1.6; }
    .label { font-weight: 600; }
  </style>
</head>
<body>
  <h1>Changelog &mdash; v2.5.0</h1>

  <h2>New Features</h2>
  <ul>
    <li><span class="label">Team Workspaces:</span> Create separate workspaces for different projects and invite team members.</li>
    <li><span class="label">Keyboard Shortcuts:</span> Press <code>?</code> anywhere to see all available shortcuts.</li>
  </ul>

  <h2>Performance</h2>
  <ul>
    <li>Sync is now significantly faster due to batched file writes.</li>
    <li>Search results appear instantly after the first open.</li>
  </ul>

  <h2>Bug Fixes</h2>
  <ul>
    <li>Fixed a hang that occurred when uploading files larger than 500 MB.</li>
    <li>Resolved incorrect scheduling times for users in half-hour UTC offset timezones.</li>
    <li>Fixed a crash in search when the index was empty.</li>
  </ul>
</body>
</html>
```
