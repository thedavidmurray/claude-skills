#!/usr/bin/env python3
"""
{{SERVER_NAME}} MCP Server

{{DESCRIPTION}}
"""

import asyncio
import sys
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import (
    TextContent,
    Tool,
    Resource,
    ErrorCode,
    McpError,
)

# Import tool handlers
# from tools.get_forecast import handle_get_forecast, GET_FORECAST_TOOL

# Import resource providers
# from resources.query import handle_query_resource

# Server instance
app = Server("{{SERVER_NAME}}")

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
    # Add more tools here
]

# === RESOURCE DEFINITIONS ===

RESOURCES: list[Resource] = [
    {
        "uri": "example://docs/readme",
        "name": "Example Resource",
        "mimeType": "text/plain",
        "description": "An example resource demonstrating the pattern",
    },
    # Add more resources here
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
        
        # Add tool implementations here
        # elif name == "get_forecast":
        #     return await handle_get_forecast(arguments)
        
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
        
        # Add resource implementations here
        # elif uri.startswith("query://"):
        #     return await handle_query_resource(uri)
        
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

# === SERVER STARTUP ===

async def main():
    """Start the MCP server."""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    # Reconfigure stdout for line buffering (important for stdio transport)
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(line_buffering=True)
    
    asyncio.run(main())
