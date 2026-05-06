---
name: code-review
description: Comprehensive code review using zen-mcp's codereview tool. Use PROACTIVELY after writing significant code to catch issues before they become problems.
metadata:
  tags:
  - code-review
  - quality
  - bugs
  - security
  - proactive
  tier: general
  domain: product
when_to_apply: Proactively after writing a significant function, class, or module before telling the user it is done
---
# Code Review Skill

Comprehensive code review using zen-mcp's codereview tool.

## When to Activate

**PROACTIVE TRIGGERS** - Use automatically when:
- After writing a new function, class, or module
- After implementing a feature (before telling user "done")
- After refactoring existing code
- When making security-sensitive changes
- Before suggesting code is production-ready

**DO NOT use for:**
- Single-line fixes
- Comment/documentation changes only
- Trivial formatting changes

## Usage

```
/review [file_or_directory] [options]
```

**Options:**
- `--type <full|security|performance|quick>` - Review focus (default: full)
- `--severity <critical|high|medium|low|all>` - Minimum severity to report
- `--model <o3|gemini-pro|flash>` - Model for analysis (default: o3)

## Review Dimensions

| Dimension | What's Checked |
|-----------|----------------|
| **Security** | Injection, auth bypass, secrets, input validation |
| **Performance** | N+1 queries, unnecessary loops, memory leaks |
| **Quality** | Code smells, duplication, complexity |
| **Correctness** | Logic errors, edge cases, error handling |
| **Style** | Consistency, naming, documentation |

## Review Types

### `quick` (1-2 min)
- Surface-level scan
- Obvious bugs and security issues
- Basic style violations

### `full` (3-5 min)
- Complete analysis
- All severity levels
- Pattern detection
- Performance considerations

### `security` (2-3 min)
- OWASP Top 10 focused
- Input validation
- Authentication/authorization
- Secrets detection

### `performance` (2-3 min)
- Algorithm complexity
- Database query patterns
- Memory usage
- Caching opportunities

## Implementation

Uses zen-mcp codereview tool in 3 steps:
1. **Identify Scope** - Determine files to review
2. **Run Code Review** - Use `mcp__zen__codereview` with specified review type
3. **Deep Analysis** - Pattern detection and security analysis
4. **Synthesis** - Final recommendations and action items

## Output Format

```
Code Review: src/hooks/skill-activation.py

Summary:
- Lines reviewed: 206
- Issues found: 3
- Overall: NEEDS ATTENTION

Critical (0): None found
High (1): [details]
Medium (2): [details]
Low (0): None found

Positive Patterns: [what's done well]
Action Items: [prioritized fixes]
```

## Related Skills

- `/precommit` - Pre-commit validation (before committing)
- `/learn` - Save patterns discovered during review
- `/test` - Run tests after fixes

## Command Reference

Corresponds to `/review` command.
