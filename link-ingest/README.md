# claude-link-ingest

A Claude Code skill for ingesting any web URL into a knowledge base. It
auto-detects content type (article, video, podcast, paper, GitHub repo, book,
music), scrapes with the best strategy for the site, then creates a structured
Obsidian note and optionally stores it in ChromaDB for semantic search.

## Install

```bash
mkdir -p .claude/skills && cp -r link-ingest .claude/skills/
```

Works standalone with Claude Code's built-in WebFetch/WebSearch and `curl`.
Optionally, Firecrawl and Tavily API keys (or MCP servers) improve results on
JS-heavy/paywalled sites, and a ChromaDB MCP server enables semantic search
storage — without it, notes are simply saved without indexing.

## Usage

> "/ingest https://example.com/article"

> "ingest this: https://medium.com/@author/article"

> "save this link: https://github.com/owner/repo"

> "archive this: https://arxiv.org/abs/2401.00001"

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT License. Copyright (c) 2026 Edgeless.
