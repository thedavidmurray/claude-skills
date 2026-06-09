# claude-mcp-server-scaffold

A Claude Code skill for scaffolding production-ready MCP (Model Context
Protocol) servers in TypeScript/Node.js or Python, with stdio (Claude Desktop)
or HTTP/SSE (remote) transports, schema-validated tool handlers, and resource
providers.

## Install

```bash
mkdir -p .claude/skills && cp -r mcp-server-scaffold .claude/skills/
```

Generated servers need Node.js/npm (TypeScript) or Python 3 to build and run.

## Usage

> "/mcp-server-scaffold"

> "Create an MCP server called 'weather-mcp' with stdio transport and a 'get-forecast' tool"

> "Scaffold an HTTP MCP server for database queries"

## Contents

- `templates/` — TypeScript and Python server, tool, and resource templates
- `scripts/` — CLI scaffolding script
- `references/` — MCP protocol guide and stdio/HTTP integration docs

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT License. Copyright (c) 2026 Edgeless.
