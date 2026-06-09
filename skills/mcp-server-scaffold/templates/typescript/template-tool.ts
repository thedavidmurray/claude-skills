import { z } from "zod";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * {{TOOL_NAME}} Tool Handler
 * 
 * {{DESCRIPTION}}
 */

// === INPUT SCHEMA ===

export const {{TOOL_NAME_CAMEL}}Schema = z.object({
  // Define your input parameters here
  // Example:
  // location: z.string().describe("City name or coordinates"),
  // units: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  
  {{PARAMS}}
});

export type {{TOOL_NAME_PASCAL}}Input = z.infer<typeof {{TOOL_NAME_CAMEL}}Schema>;

// === TOOL DEFINITION ===

export const {{TOOL_NAME}}Definition = {
  name: "{{TOOL_NAME}}",
  description: "{{DESCRIPTION}}",
  inputSchema: {
    type: "object" as const,
    properties: {
      // Mirror Zod schema in JSON Schema format
      // Example:
      // location: {
      //   type: "string",
      //   description: "City name or coordinates",
      // },
      // units: {
      //   type: "string",
      //   enum: ["celsius", "fahrenheit"],
      //   description: "Temperature units",
      // },
      
      {{PROPERTIES}}
    },
    required: [{{REQUIRED_PARAMS}}],
  },
};

// === HANDLER ===

export async function handle{{TOOL_NAME_PASCAL}}(
  args: unknown
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  // Validate input
  const parseResult = {{TOOL_NAME_CAMEL}}Schema.safeParse(args);
  if (!parseResult.success) {
    throw new McpError(
      ErrorCode.InvalidParams,
      `Invalid parameters: ${parseResult.error.message}`
    );
  }

  const params = parseResult.data;

  try {
    // === IMPLEMENT YOUR TOOL LOGIC HERE ===
    
    // Example:
    // const result = await fetchWeather(params.location, params.units);
    
    const result = await execute{{TOOL_NAME_PASCAL}}(params);
    
    return {
      content: [
        {
          type: "text" as const,
          text: formatResult(result),
        },
      ],
    };
  } catch (error) {
    console.error(`{{TOOL_NAME}} tool error:`, error);
    
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to execute {{TOOL_NAME}}: ${error}`
    );
  }
}

// === IMPLEMENTATION ===

async function execute{{TOOL_NAME_PASCAL}}(
  params: {{TOOL_NAME_PASCAL}}Input
): Promise<unknown> {
  // TODO: Implement the actual tool logic
  
  throw new Error("Not implemented: execute{{TOOL_NAME_PASCAL}}");
}

function formatResult(result: unknown): string {
  // TODO: Format the result for display
  
  return JSON.stringify(result, null, 2);
}
