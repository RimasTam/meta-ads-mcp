#!/bin/bash
# Helper script to start Meta Ads MCP server in HTTP mode

# Load environment variables if .env.local exists
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Start the MCP server in HTTP mode
cd ..
python -m meta_ads_mcp --transport streamable-http --host 0.0.0.0 --port 8080

# Note: The server will be accessible at http://localhost:8080/mcp
