#!/bin/bash
#
# scaffold-mcp-server.sh - Scaffold a new MCP server from templates
# Usage: ./scaffold-mcp-server.sh --name <server-name> --transport <stdio|http> --language <typescript|python>
#

set -e

# Default values
SERVER_NAME=""
TRANSPORT="stdio"
LANGUAGE="typescript"
TOOLS=""
RESOURCES=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --name)
      SERVER_NAME="$2"
      shift 2
      ;;
    --transport)
      TRANSPORT="$2"
      shift 2
      ;;
    --language)
      LANGUAGE="$2"
      shift 2
      ;;
    --tools)
      TOOLS="$2"
      shift 2
      ;;
    --resources)
      RESOURCES="$2"
      shift 2
      ;;
    --help)
      echo "Usage: scaffold-mcp-server.sh [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --name <name>         Server name (kebab-case, required)"
      echo "  --transport <type>    Transport type: stdio (default) or http"
      echo "  --language <lang>     Language: typescript (default) or python"
      echo "  --tools <list>        Comma-separated tool names to scaffold"
      echo "  --resources <list>    Comma-separated resource names to scaffold"
      echo "  --help                Show this help message"
      echo ""
      echo "Examples:"
      echo "  ./scaffold-mcp-server.sh --name weather-mcp --transport stdio --tools get-forecast"
      echo "  ./scaffold-mcp-server.sh --name db-query-mcp --transport http --language python"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Validate required arguments
if [[ -z "$SERVER_NAME" ]]; then
  echo "Error: --name is required"
  echo "Use --help for usage information"
  exit 1
fi

# Validate transport
if [[ "$TRANSPORT" != "stdio" && "$TRANSPORT" != "http" ]]; then
  echo "Error: transport must be 'stdio' or 'http'"
  exit 1
fi

# Validate language
if [[ "$LANGUAGE" != "typescript" && "$LANGUAGE" != "python" ]]; then
  echo "Error: language must be 'typescript' or 'python'"
  exit 1
fi

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

# Create project directory
echo "Scaffolding MCP server: $SERVER_NAME"
echo "  Transport: $TRANSPORT"
echo "  Language: $LANGUAGE"
echo ""

mkdir -p "$SERVER_NAME"
cd "$SERVER_NAME"

# Copy templates based on language
if [[ "$LANGUAGE" == "typescript" ]]; then
  TEMPLATE_DIR="$SKILL_DIR/templates/typescript"
  
  # Copy package.json template
  cp "$TEMPLATE_DIR/template-package.json" package.json
  sed -i '' "s/{{SERVER_NAME}}/$SERVER_NAME/g" package.json 2>/dev/null || sed -i "s/{{SERVER_NAME}}/$SERVER_NAME/g" package.json
  
  # Create src directory
  mkdir -p src/tools src/resources
  
  # Copy server template
  cp "$TEMPLATE_DIR/template-server-$TRANSPORT.ts" src/server.ts
  
  # Create tsconfig.json
  cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOF
  
  # Scaffold tools
  if [[ -n "$TOOLS" ]]; then
    IFS=',' read -ra TOOL_LIST <<< "$TOOLS"
    for tool in "${TOOL_LIST[@]}"; do
      tool=$(echo "$tool" | xargs)  # trim whitespace
      echo "  Creating tool: $tool"
      cp "$TEMPLATE_DIR/template-tool.ts" "src/tools/$tool.ts"
      # Replace tool name placeholder
      sed -i '' "s/{{TOOL_NAME}}/$tool/g" "src/tools/$tool.ts" 2>/dev/null || sed -i "s/{{TOOL_NAME}}/$tool/g" "src/tools/$tool.ts"
    done
  fi
  
  # Scaffold resources
  if [[ -n "$RESOURCES" ]]; then
    IFS=',' read -ra RESOURCE_LIST <<< "$RESOURCES"
    for resource in "${RESOURCE_LIST[@]}"; do
      resource=$(echo "$resource" | xargs)  # trim whitespace
      echo "  Creating resource: $resource"
      cp "$TEMPLATE_DIR/template-resource.ts" "src/resources/$resource.ts"
      # Replace resource name placeholder
      sed -i '' "s/{{RESOURCE_NAME}}/$resource/g" "src/resources/$resource.ts" 2>/dev/null || sed -i "s/{{RESOURCE_NAME}}/$resource/g" "src/resources/$resource.ts"
    done
  fi
  
else
  # Python setup
  TEMPLATE_DIR="$SKILL_DIR/templates/python"
  
  # Copy package.json template (for Python we still need it for some tools)
  cp "$TEMPLATE_DIR/template-package.json" package.json 2>/dev/null || true
  
  # Create src directory
  mkdir -p src/tools src/resources
  
  # Copy server template
  cp "$TEMPLATE_DIR/template-server-$TRANSPORT.py" src/server.py
  
  # Create requirements.txt
  cat > requirements.txt << 'EOF'
modelcontextprotocol>=1.0.0
pydantic>=2.0.0
EOF
  
  # Scaffold tools
  if [[ -n "$TOOLS" ]]; then
    IFS=',' read -ra TOOL_LIST <<< "$TOOLS"
    for tool in "${TOOL_LIST[@]}"; do
      tool=$(echo "$tool" | xargs)  # trim whitespace
      echo "  Creating tool: $tool"
      cp "$TEMPLATE_DIR/template-tool.py" "src/tools/$tool.py"
    done
  fi
fi

# Create README.md
cat > README.md << EOF
# $SERVER_NAME

MCP server with $TRANSPORT transport.

## Installation
\`\`\`bash
$(if [[ "$LANGUAGE" == "typescript" ]]; then echo "npm install"; else echo "pip install -r requirements.txt"; fi)
\`\`\`

## Build
\`\`\`bash
$(if [[ "$LANGUAGE" == "typescript" ]]; then echo "npm run build"; else echo "# Python - no build step required"; fi)
\`\`\`

## Run
\`\`\`bash
$(if [[ "$LANGUAGE" == "typescript" ]]; then echo "npm start"; else echo "python src/server.py"; fi)
\`\`\`

$(if [[ "$TRANSPORT" == "stdio" ]]; then echo ""; echo "## Claude Desktop Configuration"; echo "Add to your claude_desktop_config.json:"; echo '\`\`\`json'; echo "{"; echo '  "mcpServers": {'; echo "    \"$SERVER_NAME\":"; echo '      "command": "node",'; echo "      \"args\": [\"$(pwd)/dist/server.js\"]"; echo '    }'; echo '  }'; echo '}'; echo '\`\`\`'; fi)
EOF

echo ""
echo "MCP server scaffolded successfully in: $(pwd)"
echo ""
echo "Next steps:"
echo "  1. cd $SERVER_NAME"
if [[ "$LANGUAGE" == "typescript" ]]; then
  echo "  2. npm install"
  echo "  3. npm run build"
  echo "  4. npm start"
else
  echo "  2. pip install -r requirements.txt"
  echo "  3. python src/server.py"
fi