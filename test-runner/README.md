[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-test-runner

A Claude Code skill for running tests, generating test scaffolds, and managing test coverage. It auto-detects your project's test framework (Jest, Vitest, pytest, Mocha, unittest) and provides a consistent interface across all of them. The skill can also generate test file stubs for existing source files and produce coverage reports with uncovered line identification.

## Installation

```bash
mkdir -p .claude/skills/test-runner
mkdir -p .claude/skills && cp -r test-runner .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/test-runner/SKILL.md` - Test running and scaffold generation
```

## Usage

```bash
/test                           # Run all tests
/test src/utils.js              # Test specific file
/test --coverage                # With coverage report
/test generate src/api.js       # Generate tests for a file
/test "authentication" -v       # Verbose, filter by pattern
/test --watch                   # TDD watch mode
/test --ci --bail               # CI: fail fast
```

## Supported Frameworks

| Framework | Language | Detection |
|-----------|----------|-----------|
| Jest | JavaScript/TypeScript | `package.json` devDependencies |
| Vitest | JavaScript/TypeScript | `package.json` devDependencies |
| Mocha | JavaScript/TypeScript | `package.json` devDependencies |
| pytest | Python | `pytest.ini` or `pyproject.toml` |
| unittest | Python | `setup.py` |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
