# Testing Reference

Quality gates and conventions for Claude Code testing.

## Install

```bash
/plugin install testing-reference@claude-skills
```

## Gates

- Line coverage >= 80%
- Branch coverage >= 70%
- Critical path coverage 100%
- Full suite < 5 min

## Naming

- `describe('<module>'`
- `it('should <behavior> when <condition>'`
