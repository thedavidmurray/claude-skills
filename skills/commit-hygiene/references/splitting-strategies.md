# Commit Splitting Strategies

When commits exceed thresholds (>400 lines, >10 files, or 3+ categories), use these proven strategies to break them into smaller, reviewable units.

## General Principles

1. **Each commit should be independently reviewable**
2. **Each commit should pass tests (if possible)**
3. **Split by concern, not by time or file count**
4. **Maintain logical progression**

## Strategy 1: By Architectural Layer

Split by moving from bottom to top of the stack.

### Example: Adding User Authentication

**Before (Red Zone):**
```
feat: add user authentication (15 files, 650 lines)
- database/schema.sql
- database/migrations/001_users.sql
- api/routes/auth.py
- api/controllers/auth_controller.py
- api/middleware/jwt.py
- frontend/components/LoginForm.tsx
- frontend/components/SignupForm.tsx
- frontend/pages/login.tsx
- frontend/services/auth.ts
- tests/api/test_auth.py
- tests/frontend/LoginForm.test.tsx
- docs/authentication.md
```

**After (Green Zone):**
```
1. feat(db): add user authentication schema (2 files, 120 lines)
   - database/schema.sql
   - database/migrations/001_users.sql

2. feat(api): add authentication endpoints (3 files, 180 lines)
   - api/routes/auth.py
   - api/controllers/auth_controller.py
   - api/middleware/jwt.py

3. feat(frontend): add login UI components (4 files, 210 lines)
   - frontend/components/LoginForm.tsx
   - frontend/components/SignupForm.tsx
   - frontend/pages/login.tsx
   - frontend/services/auth.ts

4. test(auth): add authentication tests (2 files, 140 lines)
   - tests/api/test_auth.py
   - tests/frontend/LoginForm.test.tsx

5. docs(auth): add authentication documentation (1 file, 50 lines)
   - docs/authentication.md
```

**Advantages:**
- Each layer can be reviewed independently
- Natural progression (data → business logic → UI)
- Dependencies clear (API depends on DB, frontend depends on API)

## Strategy 2: By Feature Slice (Vertical)

Split by user-facing capability, implementing full stack for each slice.

### Example: CRUD Operations

**Before (Red Zone):**
```
feat: add product management (18 files, 780 lines)
- All CRUD operations for products in one commit
```

**After (Green Zone):**
```
1. feat(product): add product creation (5 files, 180 lines)
   - Backend: POST /products endpoint
   - Frontend: CreateProduct form
   - Tests: product creation tests

2. feat(product): add product listing (4 files, 150 lines)
   - Backend: GET /products endpoint
   - Frontend: ProductList component
   - Tests: product listing tests

3. feat(product): add product details (4 files, 160 lines)
   - Backend: GET /products/:id endpoint
   - Frontend: ProductDetails component
   - Tests: product details tests

4. feat(product): add product updates (3 files, 140 lines)
   - Backend: PUT /products/:id endpoint
   - Frontend: EditProduct form
   - Tests: product update tests

5. feat(product): add product deletion (2 files, 120 lines)
   - Backend: DELETE /products/:id endpoint
   - Frontend: delete confirmation
   - Tests: product deletion tests
```

**Advantages:**
- Each commit delivers end-to-end value
- Can demo/test each feature immediately
- Natural rollback boundaries

## Strategy 3: Refactor First, Feature Second

Separate preparatory refactoring from new features.

### Example: Adding OAuth Support

**Before (Red Zone):**
```
feat: add OAuth support (12 files, 550 lines)
- Refactor existing auth to use common interface
- Add OAuth provider
- Update UI
```

**After (Green Zone):**
```
1. refactor(auth): extract authentication interface (4 files, 140 lines)
   - Extract IAuthProvider interface
   - Refactor password auth to implement interface
   - No behavior changes
   - Tests: existing tests still pass

2. feat(auth): add OAuth provider implementation (5 files, 230 lines)
   - OAuthProvider class implementing IAuthProvider
   - OAuth configuration
   - Tests: OAuth provider tests

3. feat(auth): add OAuth UI flow (3 files, 180 lines)
   - OAuth login button
   - OAuth callback handling
   - Tests: OAuth UI tests
```

**Advantages:**
- Refactoring visible as safe, no-behavior-change commit
- Feature implementation cleaner after refactoring
- Easy to review refactoring separately from feature

## Strategy 4: By Risk Level

Split high-risk changes from low-risk changes.

### Example: Database Migration

**Before (Red Zone):**
```
feat: migrate to new database schema (14 files, 620 lines)
- Schema changes
- Data migration
- Code updates
- Rollback scripts
```

**After (Green Zone):**
```
1. feat(db): add new schema alongside old (2 files, 80 lines)
   - New tables created
   - Old tables unchanged
   - Low risk: additive only

2. feat(db): add dual-write logic (3 files, 140 lines)
   - Write to both old and new schema
   - Read from old schema
   - Low risk: old path unchanged

3. feat(db): add data migration script (2 files, 120 lines)
   - Backfill new schema from old
   - Verification queries
   - Medium risk: data transformation

4. feat(db): switch reads to new schema (4 files, 180 lines)
   - Update queries to new schema
   - Keep dual-writes active
   - Medium risk: read path changes

5. feat(db): remove old schema and dual-writes (3 files, 100 lines)
   - Drop old tables
   - Remove dual-write code
   - High risk: point of no return
```

**Advantages:**
- Each step is independently verifiable
- Can pause/rollback at any point
- Risk progression visible in commit history

## Strategy 5: By Category (Type)

Separate different types of changes.

### Example: Mixed Changes

**Before (Red Zone):**
```
chore: various updates (16 files, 580 lines)
- New feature: user profiles
- Bug fix: login timeout
- Refactoring: extract validation
- Dependency updates
- Documentation
```

**After (Green Zone):**
```
1. fix(auth): correct login timeout handling (2 files, 45 lines)
   - Fix JWT expiration check
   - Add test for timeout case

2. refactor(validation): extract validation utilities (3 files, 120 lines)
   - Extract common validation functions
   - No behavior changes
   - Update tests

3. feat(user): add user profile page (6 files, 280 lines)
   - Profile endpoint
   - Profile UI
   - Tests

4. chore(deps): update dependencies (3 files, 85 lines)
   - package.json updates
   - Lock file updates
   - Update changelog

5. docs(api): add API documentation (2 files, 50 lines)
   - API endpoint docs
   - Usage examples
```

**Advantages:**
- Clear commit message types
- Easy to find specific changes in history
- Releases can selectively include changes

## Strategy 6: By File Dependency

Split based on which files depend on others.

### Example: Shared Utilities

**Before (Red Zone):**
```
feat: add validation framework (11 files, 490 lines)
- Core validation utilities
- Email validator
- Phone validator
- Forms using validators
```

**After (Green Zone):**
```
1. feat(validation): add core validation framework (2 files, 110 lines)
   - Validator base class
   - ValidationResult types
   - No dependencies

2. feat(validation): add email validator (2 files, 80 lines)
   - Depends on: validation framework
   - EmailValidator implementation
   - Tests

3. feat(validation): add phone validator (2 files, 90 lines)
   - Depends on: validation framework
   - PhoneValidator implementation
   - Tests

4. feat(forms): integrate validators into forms (5 files, 210 lines)
   - Depends on: email and phone validators
   - Update form components
   - Update form tests
```

**Advantages:**
- Dependency graph clear from commit order
- Each commit builds on previous
- Easy to understand progression

## Strategy 7: By Test Coverage

Separate test additions from implementation.

### Example: Adding Tests to Legacy Code

**Before (Red Zone):**
```
feat: add tests and refactor legacy module (14 files, 640 lines)
- Add missing tests
- Refactor for testability
- Fix discovered bugs
```

**After (Green Zone):**
```
1. test(legacy): add integration tests for current behavior (3 files, 150 lines)
   - Test existing behavior as-is
   - Establish baseline
   - All tests pass

2. refactor(legacy): extract testable functions (4 files, 180 lines)
   - Extract pure functions
   - No behavior changes
   - Integration tests still pass

3. test(legacy): add unit tests for extracted functions (4 files, 160 lines)
   - Test extracted functions
   - All tests pass

4. fix(legacy): correct bugs discovered during testing (3 files, 150 lines)
   - Fix bugs found
   - Update tests to reflect correct behavior
```

**Advantages:**
- Tests demonstrate existing behavior before changes
- Refactoring safety: tests guard against regressions
- Bug fixes explicit and testable

## Anti-Patterns to Avoid

### ❌ Splitting by Time/Date
```
commit 1: Monday's work
commit 2: Tuesday's work
commit 3: Wednesday's work
```
**Problem:** Commits not logically cohesive, hard to review

### ❌ Splitting by File Count
```
commit 1: files 1-5
commit 2: files 6-10
commit 3: files 11-15
```
**Problem:** Related changes split across commits, hard to understand

### ❌ WIP Commits
```
commit 1: WIP
commit 2: WIP - almost there
commit 3: WIP - fixing bugs
commit 4: final version
```
**Problem:** Commit history doesn't tell a story, hard to find changes

### ❌ One File Per Commit (when files are related)
```
commit 1: update model.py
commit 2: update view.py
commit 3: update controller.py
commit 4: update tests.py
```
**Problem:** Can't understand feature without reading all commits

## Decision Tree: Which Strategy?

```
Is this a refactoring + feature?
├─ YES → Use "Refactor First, Feature Second"
└─ NO  → Continue

Does this touch multiple architectural layers?
├─ YES → Use "By Architectural Layer"
└─ NO  → Continue

Is this a complete CRUD or multi-step feature?
├─ YES → Use "By Feature Slice"
└─ NO  → Continue

Does this involve risky changes (DB, auth, etc.)?
├─ YES → Use "By Risk Level"
└─ NO  → Continue

Does this mix different types of work?
├─ YES → Use "By Category"
└─ NO  → Continue

Are there clear dependency chains?
├─ YES → Use "By File Dependency"
└─ NO  → Use "By Category" as default
```

## Tips for Effective Splitting

1. **Use `git add -p` (interactive staging)**
   - Stage hunks one at a time
   - Commit related hunks together
   - Remaining hunks become next commit

2. **Write commit message first**
   - If you can't describe commit in <50 chars, it's too big
   - If message needs "and", you need two commits

3. **Each commit should pass tests**
   - Run test suite after each commit
   - Don't leave broken commits in history
   - Exception: when adding tests first (TDD)

4. **Use branches for large changes**
   - Make many small commits on feature branch
   - Merge when complete
   - History shows logical progression

5. **Review your own diff before committing**
   ```bash
   git diff --cached
   ```
   - Look for unrelated changes
   - Stage them separately

## Example: Interactive Staging Workflow

```bash
# Stage some changes
git add -p src/auth.py

# Review staged changes
git diff --cached

# Commit staged changes
git commit -m "feat(auth): add JWT validation"

# Stage more changes
git add -p src/auth.py

# Review again
git diff --cached

# Commit next logical unit
git commit -m "test(auth): add JWT validation tests"
```

## Metrics for Success

Good commit splits should achieve:
- ✅ Each commit in Green or Yellow zone
- ✅ Each commit independently reviewable
- ✅ Commit messages clearly describe change
- ✅ Tests pass after each commit (when possible)
- ✅ History tells a story of feature development

## Quick Reference Table

| Scenario | Best Strategy | Commits Expected |
|----------|--------------|-----------------|
| Full-stack feature | By Layer | 3-5 (DB, API, Frontend, Tests, Docs) |
| CRUD operations | By Feature Slice | 4-5 (Create, Read, Update, Delete, [List]) |
| Adding to legacy code | Refactor First | 2-3 (Refactor, Feature, Tests) |
| Database migration | By Risk Level | 4-6 (Additive, Dual-write, Migrate, Switch, Cleanup) |
| Mixed work types | By Category | 3-6 (Fix, Refactor, Feature, Chore, Docs) |
| New module with deps | By File Dependency | 3-5 (Core, Extensions, Integrations) |
| Adding test coverage | By Test Coverage | 3-4 (Integration tests, Refactor, Unit tests, Fixes) |

---

**Remember:** The goal is reviewability and clarity, not arbitrary line counts. Choose the strategy that makes your commits easiest to understand and review.
