import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// Import tool handlers
// import { handleGetForecast } from "./tools/get-forecast.js";

// Import resource providers
// import { handleQueryResource } from "./resources/query.js";

/**
 * {{SERVER_NAME}} MCP Server
 * 
 * {{DESCRIPTION}}
 */

// Server instance
const server = new Server(
  {
    name: "{{SERVER_NAME}}",
    version: "{{VERSION}}",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// === TOOL HANDLERS ===

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Add tools here
      {
        name: "example_tool",
        description: "An example tool that demonstrates the pattern",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Message to echo back",
            },
          },
          required: ["message"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "example_tool": {
        const message = args?.message as string;
        return {
          content: [
            {
              type: "text",
              text: `Echo: ${message}`,
            },
          ],
        };
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error}`
    );
  }
});

// === RESOURCE HANDLERS ===

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      // Add resources here
      {
        uri: "example://docs/readme",
        name: "Example Resource",
        mimeType: "text/plain",
        description: "An example resource demonstrating the pattern",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  try {
    switch (uri) {
      case "example://docs/readme": {
        return {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: "# Example Resource\n\nThis is a sample resource content.",
            },
          ],
        };
      }

      default:
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown resource: ${uri}`
        );
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Resource read failed: ${error}`
    );
  }
});

// === SERVER STARTUP ===

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Stdio transport handles communication automatically
  console.error("{{SERVER_NAME}} MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
