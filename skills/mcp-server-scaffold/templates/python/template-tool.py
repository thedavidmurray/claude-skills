"""
{{TOOL_NAME}} Tool Handler

{{DESCRIPTION}}
"""

from pydantic import BaseModel, Field
from mcp.types import TextContent, ErrorCode, McpError
from typing import Any


# === INPUT SCHEMA ===

class {{TOOL_NAME_PASCAL}}Input(BaseModel):
    """Input parameters for {{TOOL_NAME}} tool."""
    
    # Define your input parameters here
    # Example:
    # location: str = Field(..., description="City name or coordinates")
    # units: str = Field(default="celsius", description="Temperature units (celsius/fahrenheit)")
    
    {{PARAMS}}


# === TOOL DEFINITION ===

{{TOOL_NAME_UPPER}}_TOOL = {
    "name": "{{TOOL_NAME}}",
    "description": "{{DESCRIPTION}}",
    "inputSchema": {
        "type": "object",
        "properties": {
            # Mirror Pydantic schema in JSON Schema format
            # Example:
            # "location": {
            #     "type": "string",
            #     "description": "City name or coordinates",
            # },
            # "units": {
            #     "type": "string",
            #     "enum": ["celsius", "fahrenheit"],
            #     "default": "celsius",
            #     "description": "Temperature units",
            # },
            
            {{PROPERTIES}}
        },
        "required": [{{REQUIRED_PARAMS}}],
    },
}


# === HANDLER ===

async def handle_{{TOOL_NAME_SNAKE}}(
    arguments: dict[str, Any]
) -> list[TextContent]:
    """
    Handle {{TOOL_NAME}} tool execution.
    
    Args:
        arguments: Tool input parameters
        
    Returns:
        List of content items to return to the client
    """
    # Validate input
    try:
        params = {{TOOL_NAME_PASCAL}}Input(**arguments)
    except Exception as e:
        raise McpError(
            ErrorCode.InvalidParams,
            f"Invalid parameters: {str(e)}"
        )
    
    try:
        # === IMPLEMENT YOUR TOOL LOGIC HERE ===
        
        # Example:
        # result = await fetch_weather(params.location, params.units)
        
        result = await execute_{{TOOL_NAME_SNAKE}}(params)
        
        return [
            TextContent(
                type="text",
                text=format_result(result),
            )
        ]
        
    except McpError:
        raise
    except Exception as e:
        import logging
        logging.error(f"{{TOOL_NAME}} tool error: {e}")
        
        raise McpError(
            ErrorCode.InternalError,
            f"Failed to execute {{TOOL_NAME}}: {str(e)}"
        )


# === IMPLEMENTATION ===

async def execute_{{TOOL_NAME_SNAKE}}(
    params: {{TOOL_NAME_PASCAL}}Input
) -> Any:
    """
    Execute the actual tool logic.
    
    TODO: Implement the actual functionality here.
    """
    raise NotImplementedError("execute_{{TOOL_NAME_SNAKE}} not implemented")


def format_result(result: Any) -> str:
    """
    Format the result for display.
    
    TODO: Customize formatting based on your result type.
    """
    import json
    
    if isinstance(result, str):
        return result
    
    return json.dumps(result, indent=2, default=str)
