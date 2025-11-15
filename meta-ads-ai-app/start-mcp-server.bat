@echo off
REM Helper script to start Meta Ads MCP server in HTTP mode

REM Load environment variables if .env.local exists
if exist .env.local (
    for /f "delims=" %%x in (.env.local) do (
        set "%%x"
    )
)

REM Start the MCP server in HTTP mode
cd ..
python -m meta_ads_mcp --transport streamable-http --host 0.0.0.0 --port 8080

REM Note: The server will be accessible at http://localhost:8080/mcp
