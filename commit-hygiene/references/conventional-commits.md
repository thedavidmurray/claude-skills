# Conventional Commits Guide

Based on [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Components

### Type (Required)

Communicates the intent of the change.

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add OAuth login` |
| `fix` | Bug fix | `fix(api): correct timeout handling` |
| `docs` | Documentation only | `docs(readme): update installation steps` |
| `style` | Formatting, whitespace, no code change | `style(app): fix indentation` |
| `refactor` | Code restructure, no behavior change | `refactor(db): extract connection pool` |
| `perf` | Performance improvement | `perf(api): cache frequently accessed data` |
| `test` | Adding or updating tests | `test(auth): add login edge cases` |
| `build` | Build system or dependencies | `build(deps): upgrade to React 18` |
| `ci` | CI/CD pipeline changes | `ci(github): add automated releases` |
| `chore` | Maintenance tasks | `chore(cleanup): remove unused imports` |
| `revert` | Reverts a previous commit | `revert: feat(auth): add OAuth login` |

### Scope (Optional but Recommended)

The area of the codebase affected.

**Examples:**
- `feat(api): ...` - API changes
- `fix(ui): ...` - UI fixes
- `docs(readme): ...` - README documentation
- `test(auth): ...` - Authentication tests
- `refactor(db): ...` - Database refactoring

**Choosing scopes:**
- Use module/component names
- Be consistent across commits
- Keep scopes short (1-2 words)
- Avoid overly generic scopes like "utils" or "misc"

### Subject (Required)

Brief description of the change.

**Rules:**
- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Maximum 50 characters
- Be specific, avoid vague terms

**Good:**
- `add password reset endpoint`
- `fix race condition in cache invalidation`
- `update user model with email verification`

**Bad:**
- `Added some changes` (past tense, vague)
- `Updates.` (period, vague, capitalized)
- `Fix bug` (not specific enough)
- `Implemented the new authentication system with OAuth support and JWT tokens` (too long)

### Body (Optional)

Detailed explanation of the change.

**When to include:**
- Change is non-obvious
- Explaining WHY, not WHAT (the diff shows what)
- Breaking down complex changes
- Changes affecting >100 lines
- Security-sensitive changes
- Performance optimizations (include benchmarks)

**Format:**
- Wrap at 72 characters per line
- Separate from subject with blank line
- Use bullet points for lists
- Explain motivation for change
- Mention side effects or gotchas

**Example:**
```
refactor(db): switch to connection pooling

Previous implementation created new connection per request,
causing performance degradation under load.

Changes:
- Initialize connection pool at startup
- Reuse connections across requests
- Add connection timeout handling
- Set max pool size to 20 connections

Performance impact:
- Request latency: 250ms → 45ms (82% improvement)
- Throughput: 100 req/s → 450 req/s
```

### Footer (Optional)

Metadata about the commit.

**Common footers:**

**Breaking changes:**
```
BREAKING CHANGE: <description>
```

**Issue references:**
```
Fixes #123
Closes #456
Refs #789
```

**Co-authors:**
```
Co-authored-by: Name <email@example.com>
```

**Example:**
```
feat(api)!: change authentication endpoint

BREAKING CHANGE: /auth/login moved to /api/v2/auth/login

All clients must update their authentication calls to use
the new endpoint path. The old endpoint will be removed in v3.0.0.

Migration guide: docs/migration/v2.0.0.md

Closes #234
```

## Breaking Changes

Use `!` after type/scope OR `BREAKING CHANGE:` in footer.

**Examples:**

**Option 1: Exclamation mark**
```
feat(api)!: change response format
```

**Option 2: Footer (preferred for detailed explanation)**
```
feat(api): change response format

BREAKING CHANGE: API now returns JSON:API format instead of custom format.
See docs/migration.md for migration guide.
```

**Both options:**
```
feat(api)!: change response format

BREAKING CHANGE: API now returns JSON:API format instead of custom format.
See docs/migration.md for migration guide.
```

## Examples

### Simple Feature
```
feat(auth): add password reset endpoint
```

### Feature with Body
```
feat(cache): add Redis caching layer

Implement Redis caching for frequently accessed user data
to reduce database load and improve response times.

- Cache user profiles for 5 minutes
- Invalidate cache on user updates
- Fall back to database on cache miss

Performance: 50% reduction in database queries during peak hours
```

### Bug Fix
```
fix(api): correct timezone handling in date filters

Previous behavior: dates interpreted as UTC regardless of user timezone
New behavior: dates respect user's configured timezone
Root cause: missing timezone conversion in query builder

Fixes #456
```

### Breaking Change
```
feat(api)!: remove deprecated v1 endpoints

BREAKING CHANGE: All v1 API endpoints have been removed.

Removed endpoints:
- GET /v1/users
- POST /v1/users
- PUT /v1/users/:id
- DELETE /v1/users/:id

Migration guide:
- Replace /v1/ with /v2/ in all API calls
- Update request/response formats per docs/api/v2.md
- Update authentication to use Bearer tokens

Clients still using v1 must migrate before upgrading.

Closes #234
Refs #245, #267
```

### Refactoring
```
refactor(validation): extract email validation to utility

- Extract email validation logic from UserModel
- Create reusable EmailValidator class
- Update existing code to use new validator
- No behavior changes, all tests still pass

Enables reuse across User, Contact, and Invitation models.
```

### Documentation
```
docs(api): add authentication examples

- Add curl examples for each endpoint
- Document authentication header format
- Add error response examples
```

### Test Addition
```
test(auth): add edge cases for token expiration

- Test expired token rejection
- Test token expiring during request
- Test refresh token flow
- Test concurrent token refresh
```

### Dependency Update
```
build(deps): upgrade React to v18

- Update react and react-dom to 18.2.0
- Update @types/react to match
- Fix deprecated ReactDOM.render usage
- All tests passing

No breaking changes in our codebase.
```

### CI/CD Change
```
ci(github): add automated semantic releases

- Configure semantic-release
- Auto-generate changelogs from commits
- Publish to npm on version tags
- Add release workflow
```

### Performance Optimization
```
perf(api): optimize user query with indexed fields

Added database indexes on frequently queried fields:
- users.email
- users.created_at
- users.status

Benchmark results:
- Query time: 450ms → 12ms (97% faster)
- Tested with 1M user records
- No behavior changes
```

### Revert
```
revert: feat(api): add rate limiting

This reverts commit abc123def456.

Rate limiting caused issues with legitimate batch operations.
Will re-implement with better batch detection in future.

Refs #567
```

## Validation Checklist

Before committing, verify:

- [ ] Type is one of the standard types
- [ ] Scope is specific and consistent
- [ ] Subject uses imperative mood
- [ ] Subject is <50 characters
- [ ] Subject doesn't end with period
- [ ] Subject is specific, not vague
- [ ] Body wraps at 72 characters (if present)
- [ ] Body explains WHY, not WHAT
- [ ] Breaking changes marked with `!` or `BREAKING CHANGE:`
- [ ] Issue references in footer (if applicable)
- [ ] No "and" in subject (indicates multiple changes)

## Common Mistakes

### ❌ Wrong Tense
```
feat(auth): added OAuth login
```
**Should be:**
```
feat(auth): add OAuth login
```

### ❌ Too Vague
```
fix(api): fix bug
```
**Should be:**
```
fix(api): correct null pointer in user retrieval
```

### ❌ Multiple Changes
```
feat(app): add login and fix navbar and update deps
```
**Should be split:**
```
feat(auth): add login functionality
fix(ui): correct navbar alignment
build(deps): update dependencies
```

### ❌ Too Long
```
feat(api): implemented the new user authentication system with support for OAuth, JWT tokens, and session management
```
**Should be:**
```
feat(auth): add OAuth and JWT authentication

Implemented multi-provider OAuth support with JWT token
generation and session management.

Supported providers:
- Google
- GitHub
- Microsoft

Session expires after 24 hours of inactivity.
```

### ❌ Wrong Type
```
feat(api): fix login bug
```
**Should be:**
```
fix(api): correct login timeout handling
```

### ❌ Missing Scope
```
feat: add caching
```
**Should be:**
```
feat(api): add response caching
```

## Advanced Patterns

### Multi-part Feature
```
feat(auth): add OAuth support (1/3)

Part 1: Add OAuth provider abstraction layer

This commit establishes the foundation for OAuth support.
Subsequent commits will add specific providers and UI.

See task-123-oauth-implementation.md for full plan.

Refs #123
```

### Security Fix (Use fix, not feat)
```
fix(auth): prevent timing attack in password comparison

Replaced string equality with constant-time comparison
to prevent timing-based password enumeration.

Security issue: Low severity, requires local network access
Impact: Prevents password length discovery through timing
```

### Emergency Hotfix
```
fix(api)!: patch critical SQL injection vulnerability

SECURITY: SQL injection in search endpoint

Immediately sanitize all user input in search queries.
Full audit of input sanitization scheduled for next sprint.

This is an emergency hotfix deployed directly to production.

CVE: Pending assignment
Severity: Critical
```

### Experimental Feature
```
feat(experimental): add beta feature flags

Add feature flag system for gradual rollout of new features.

EXPERIMENTAL: This system may change based on user feedback.

Usage:
- Set feature flags in admin panel
- Features hidden behind flags in UI
- Analytics tracking for feature adoption
```

## Tools Integration

### Git Hooks
Add to `.git/hooks/commit-msg`:
```bash
#!/bin/bash
# Validate commit message format

commit_msg=$(cat "$1")
pattern="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{1,50}$"

if ! echo "$commit_msg" | grep -qE "$pattern"; then
  echo "ERROR: Commit message doesn't follow Conventional Commits format"
  echo "Expected: <type>(<scope>): <subject>"
  exit 1
fi
```

### Commitlint
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 50],
  }
};
```

### Changelog Generation
Conventional commits enable automated changelog generation:
```bash
npm install --save-dev standard-version

# Generates CHANGELOG.md from commit messages
npx standard-version
```

## Why Conventional Commits?

### Benefits

1. **Automated Versioning**
   - `feat:` → minor version bump
   - `fix:` → patch version bump
   - `BREAKING CHANGE:` → major version bump

2. **Automated Changelogs**
   - Generate release notes from commits
   - Group changes by type
   - Link to issues automatically

3. **Better History Navigation**
   - Filter commits by type: `git log --grep="^feat"`
   - Find all breaking changes: `git log --grep="BREAKING CHANGE"`
   - Search by scope: `git log --grep="^feat(auth)"`

4. **Clearer Communication**
   - Team understands impact from commit message
   - Reviewers know what to focus on
   - Users see clear release notes

5. **Tooling Integration**
   - CI/CD can auto-release based on commit type
   - Bots can auto-label PRs
   - Analytics on what types of work dominate

## Quick Reference

| Type | Meaning | Semver Impact | Changelog Section |
|------|---------|---------------|-------------------|
| `feat` | New feature | Minor | Features |
| `fix` | Bug fix | Patch | Bug Fixes |
| `docs` | Documentation | - | - |
| `style` | Formatting | - | - |
| `refactor` | Code restructure | - | - |
| `perf` | Performance | Patch | Performance |
| `test` | Tests | - | - |
| `build` | Build/dependencies | - | - |
| `ci` | CI/CD | - | - |
| `chore` | Maintenance | - | - |
| `revert` | Revert commit | - | - |
| `BREAKING CHANGE` | Breaking change | Major | BREAKING CHANGES |

---

**Remember:** Good commit messages are documentation. Write them for your future self and your teammates who will need to understand your changes months or years from now.
