[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-link-ingest

A Claude Code skill for ingesting any web URL into a knowledge base. It auto-detects content type (article, video, podcast, paper, GitHub repo, book, music), selects the best scraping strategy (Firecrawl for JS-heavy sites, basic HTTP for static), enriches content with AI-extracted topics and entities, creates a structured Obsidian note with proper frontmatter, and stores to ChromaDB for semantic search.

## Installation

```bash
mkdir -p .claude/skills/link-ingest
mkdir -p .claude/skills && cp -r link-ingest .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/link-ingest/SKILL.md` - URL ingestion to knowledge base
```

## Usage

```
/ingest https://example.com/article
ingest this: https://medium.com/@author/article
save this link: https://github.com/owner/repo
archive this: https://arxiv.org/abs/2401.00001
```

## Content Type Detection

| URL Pattern | Content Type |
|-------------|--------------|
| `youtube.com/watch`, `youtu.be/` | video |
| `arxiv.org` | paper |
| `github.com/{owner}/{repo}` | repo |
| `open.spotify.com/episode` | podcast |
| `goodreads.com/book` | book |
| Everything else | article |

## Scraping Strategy

| Site Type | Method |
|-----------|--------|
| JS-heavy (Medium, Substack, Twitter/X) | Firecrawl |
| Simple static (GitHub raw, plain blogs) | Basic HTTP |
| Search/discovery | Tavily |
| Blocked/failed | WebFetch fallback |

## What Gets Created

Each ingested URL produces:
- An Obsidian note with structured frontmatter (title, source URL, tags, summary, AI-extracted entities)
- A ChromaDB entry in the `link_intake` collection for semantic search

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
