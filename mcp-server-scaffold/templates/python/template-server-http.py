#!/usr/bin/env python3
"""
{{SERVER_NAME}} MCP Server (HTTP/SSE Transport)

{{DESCRIPTION}}
"""

import asyncio
import json
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator
from mcp.server import Server
from mcp.server.sse import SseServerTransport
from mcp.types import (
    TextContent,
    Tool,
    Resource,
    ErrorCode,
    McpError,
)
from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.requests import Request
from starlette.responses import Response

# Server instance
app = Server("{{SERVER_NAME}}")
sse = SseServerTransport("/messages")

# === TOOL DEFINITIONS ===

TOOLS: list[Tool] = [
    {
        "name": "example_tool",
        "description": "An example tool that demonstrates the pattern",
        "inputSchema": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "Message to echo back",
                },
            },
            "required": ["message"],
        },
    },
]

# === RESOURCE DEFINITIONS ===

RESOURCES: list[Resource] = [
    {
        "uri": "example://docs/readme",
        "name": "Example Resource",
        "mimeType": "text/plain",
        "description": "An example resource demonstrating the pattern",
    },
]

# === HANDLERS ===

@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available tools."""
    return TOOLS

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Execute a tool."""
    try:
        if name == "example_tool":
            message = arguments.get("message", "")
            return [
                TextContent(
                    type="text",
                    text=f"Echo: {message}",
                )
            ]
        else:
            raise McpError(
                ErrorCode.MethodNotFound,
                f"Unknown tool: {name}"
            )
    except McpError:
        raise
    except Exception as e:
        raise McpError(
            ErrorCode.InternalError,
            f"Tool execution failed: {str(e)}"
        )

@app.list_resources()
async def list_resources() -> list[Resource]:
    """List available resources."""
    return RESOURCES

@app.read_resource()
async def read_resource(uri: str) -> str:
    """Read a resource by URI."""
    try:
        if uri == "example://docs/readme":
            return "# Example Resource\n\nThis is a sample resource content."
        else:
            raise McpError(
                ErrorCode.InvalidRequest,
                f"Unknown resource: {uri}"
            )
    except McpError:
        raise
    except Exception as e:
        raise McpError(
            ErrorCode.InternalError,
            f"Resource read failed: {str(e)}"
        )

# === HTTP ROUTES ===

async def handle_sse(request: Request):
    """Handle SSE connection."""
    async with sse.connect_sse(
        request.scope, request.receive, request._send
    ) as streams:
        await app.run(
            streams[0], streams[1],
            app.create_initialization_options()
        )

async def handle_messages(request: Request):
    """Handle POST messages from client."""
    body = await request.body()
    message = json.loads(body)
    
    # Process the message through SSE transport
    response = await sse.handle_message(message)
    
    return Response(
        content=json.dumps(response) if response else "",
        media_type="application/json"
    )

# === STARLETTE APP ===

routes = [
    Route("/sse", endpoint=handle_sse),
    Route("/messages", endpoint=handle_messages, methods=["POST"]),
]

starlette_app = Starlette(routes=routes)

# === SERVER STARTUP ===

if __name__ == "__main__":
    import uvicorn
    
    print("{{SERVER_NAME}} MCP server starting on http://localhost:3000")
    print("SSE endpoint: GET /sse")
    print("Message endpoint: POST /messages")
    
    uvicorn.run(starlette_app, host="0.0.0.0", port=3000)
