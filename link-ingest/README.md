# claude-link-ingest

A Claude Code skill for ingesting any web URL into a knowledge base. It
auto-detects content type (article, video, podcast, paper, GitHub repo, book,
music), scrapes with the best strategy for the site, then creates a structured
Obsidian note and stores it in ChromaDB for semantic search.

## Install

```bash
mkdir -p .claude/skills && cp -r link-ingest .claude/skills/
```

Needs Firecrawl and Tavily API keys for JS-heavy/paywalled sites, plus a
ChromaDB MCP server for semantic search storage.

## Usage

> "/ingest https://example.com/article"

> "ingest this: https://medium.com/@author/article"

> "save this link: https://github.com/owner/repo"

> "archive this: https://arxiv.org/abs/2401.00001"

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT License. Copyright (c) 2026 Edgeless.
