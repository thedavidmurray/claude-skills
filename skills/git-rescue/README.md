# claude-git-rescue

A Claude Code skill for recovering from git disasters: lost commits, botched rebases, accidental resets, bad merges, deleted branches, destroyed working-tree changes, and committed secrets. It always inventories via reflog/fsck and creates a backup ref before any surgery, prefers reversible commands on shared branches, and includes `git bisect` as a regression-hunting feedback loop.

## Install

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install git-rescue@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/git-rescue .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

> "I lost my commits after a rebase — help."

> "I ran git reset --hard and my work is gone."

> "I committed an API key to this repo."

> "Which commit broke the checkout flow? Bisect it."

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
