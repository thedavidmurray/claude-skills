# TDD Quick Reference Card

## The Iron Law
```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

## The Cycle (5 Mandatory Steps)

```
1. RED       → Write one failing test
2. VERIFY ❌ → Watch it fail (correct reason)
3. GREEN     → Minimal code to pass
4. VERIFY ✅ → Watch it pass (all tests green)
5. REFACTOR  → Clean up (keep green)
```

**NEVER skip verification steps.**

## Checklist Before Implementation

- [ ] Test written FIRST
- [ ] Test FAILED when run
- [ ] Failure reason was correct (feature missing, not typo)
- [ ] Code is MINIMAL (just enough to pass)
- [ ] Test PASSED after implementation
- [ ] ALL other tests still pass
- [ ] No warnings or errors in output

## Red Flags (Delete Code and Start Over)

- Code written before test
- Test passes immediately
- Can't explain why test failed
- "I'll test after"
- "Just this once"
- "Already manually tested"
- "Deleting X hours is wasteful"

## Gate Functions

### Before Writing Production Code
```
IF no failing test exists for this behavior:
  STOP - Write the test first
```

### Before Claiming Complete
```
IF any checklist item unchecked:
  NOT complete - Finish TDD cycle
```

### Before Mocking
```
Ask: "Do I understand what this test actually needs?"
Ask: "Am I mocking at the right level?"
Ask: "Will this preserve the behavior my test depends on?"

IF unsure:
  Run with real implementation first
  Observe what actually happens
  THEN add minimal mocking
```

## Common Excuses (All Invalid)

| Excuse | Reality |
|--------|---------|
| Too simple to test | Test takes 30 seconds |
| I'll test after | Proves nothing |
| Already manually tested | Not systematic |
| Deleting work is wasteful | Sunk cost fallacy |
| TDD slows me down | Faster than debugging |
| Tests after = same thing | Tests-after = "what it does", Tests-first = "what it should do" |

## Test Quality

**Good Test:**
- One behavior
- Clear name (describes what should happen)
- Real code (no mocks unless unavoidable)
- Shows desired API usage

**Bad Test:**
- Multiple behaviors ("and" in name)
- Vague name ("test works")
- Tests mock behavior
- Obscures what code should do

## Anti-Patterns to Avoid

See `testing-anti-patterns.md` for details:

1. Testing mock behavior (not real behavior)
2. Test-only methods in production classes
3. Mocking without understanding dependencies
4. Incomplete mocks (missing fields)
5. Tests as afterthought

## When Stuck

| Problem | Solution |
|---------|----------|
| Don't know how to test | Write wished-for API first. Ask for help. |
| Test too complicated | Design too complicated. Simplify. |
| Must mock everything | Code too coupled. Use dependency injection. |
| Test setup huge | Extract helpers. Still complex? Simplify design. |

## Integration with CLAUDE.md

**ALWAYS check CLAUDE.md for:**
- Test framework and commands
- Coverage requirements
- Error handling patterns
- Linting rules (must pass)

**Complete = Tests + Linting + CLAUDE.md compliance**

## The Bottom Line

```
Write test → Watch fail → Minimal code → Watch pass → Refactor
```

**Anything else is not TDD.**
