# claude-article-extractor

A Claude Code skill that extracts clean article content from any URL — blog
posts, news articles, documentation pages, GitHub READMEs — and saves the
result as readable markdown with YAML frontmatter metadata.

## What It Does

- Strips ads, navigation menus, sidebars, cookie banners, and other clutter
- Preserves article body, headings, code blocks, and blockquotes
- Generates frontmatter: title, author, date, source URL, word count
- Saves output as a portable `.md` file to any path you specify
- Handles paywalled content gracefully (saves partial content, flags it)
- Works on news sites, blogs, documentation, and GitHub READMEs

## Backend Fallback Chain

The skill tries four backends in order, moving to the next if the previous
produces no content:

```
1. reader-cli   (Mozilla Readability — best for static articles)
      ↓ fallback
2. trafilatura  (Python — best for academic / complex / non-English content)
      ↓ fallback
3. Firecrawl    (API — best for JS-heavy SPAs: Medium, Substack, Notion)
      ↓ fallback
4. Basic fetch  (Python stdlib — no dependencies, last resort)
```

## Installation

### 1. Install the skill

Copy `SKILL.md` into your Claude Code skills directory:

```bash
# Claude Code user-level skills directory
mkdir -p ~/.claude/skills/article-extractor
cp SKILL.md ~/.claude/skills/article-extractor/SKILL.md
```

Or add it to a project-level skills directory:

```bash
mkdir -p .claude/skills/article-extractor
cp SKILL.md .claude/skills/article-extractor/SKILL.md
```

Claude Code discovers skills automatically from these locations.

### 2. Install optional backends

The skill works with zero additional dependencies (falls back to Python
stdlib), but installs more backends for better results:

```bash
# Backend 1: reader-cli (recommended — requires Node.js)
npm install -g reader-cli

# Backend 2: trafilatura (recommended — requires Python 3)
pip install trafilatura

# Backend 3: Firecrawl (optional — for JS-heavy sites)
pip install firecrawl-py
# Also set: export FIRECRAWL_API_KEY="fc-..."
```

## Example Usage

Tell Claude Code what you want:

> "Extract the article at https://example.com/interesting-post and save it to
> my reading folder."

> "Download this blog post and save it as markdown: https://..."

> "Grab the content from this documentation page, I want to read it offline."

Claude will use the skill automatically based on the trigger phrases.

## Example Output

Given a URL, the skill produces a `.md` file like:

```markdown
---
title: "How Compilers Work"
author: "Jane Smith"
date: "2024-11-15"
source_url: https://example.com/how-compilers-work
extracted_date: 2025-01-20
word_count: 3241
extraction_backend: trafilatura
---

# How Compilers Work

Compilers translate source code written in a high-level language into machine
code that a processor can execute directly...
```

## Firecrawl Setup

Firecrawl is optional but useful for JavaScript-heavy sites (Medium,
Substack, Notion, LinkedIn) where the other backends retrieve little content.

1. Sign up at [firecrawl.dev](https://firecrawl.dev) — 500 free credits/month
2. Copy your API key
3. Set the environment variable before running Claude Code:

```bash
export FIRECRAWL_API_KEY="fc-your-key-here"
```

Or add it to a `.env` file in your project root (Claude Code loads `.env`
automatically in many configurations).

## GitHub README Extraction

For GitHub repository READMEs the skill uses a shortcut: it converts the
`github.com` URL to the `raw.githubusercontent.com` equivalent and fetches
the raw markdown directly, skipping the HTML extraction chain entirely.

## Output Path

The skill does not write to any hardcoded location. It asks where you want
the file saved, or defaults to the current working directory. You are always
in control of where output lands.

## Paywall Handling

When a paywall is detected (extracted content is very short or empty), the
skill:

1. Saves whatever partial content was retrieved
2. Adds `paywall: true` to the frontmatter
3. Notifies you that the article appears to be behind a paywall

It never fabricates content that was not actually retrieved.

## License

MIT License — Copyright (c) 2025 Edgeless Labs

See `LICENSE` for full terms.
