# Meta Ads AI Assistant

An AI-powered Meta Ads management assistant with a ChatGPT-like interface. Built with Next.js, Vercel AI SDK, Kimi K2 Thinking model, and Meta Ads MCP server.

![Meta Ads AI Assistant](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![AI SDK](https://img.shields.io/badge/AI%20SDK-Vercel-blue?style=for-the-badge)
![Kimi K2](https://img.shields.io/badge/Kimi%20K2-Thinking-purple?style=for-the-badge)

## Features

- **Conversational Interface**: ChatGPT-like UI for natural Meta Ads interactions
- **AI-Powered Insights**: Kimi K2 Thinking model for advanced reasoning
- **Audience Research**: Search interests, behaviors, demographics, and geo-locations
- **Campaign Analysis**: Performance insights with breakdowns and metrics
- **Real-time Streaming**: Streaming responses for better UX
- **Tool Calling**: Automatic execution of Meta Ads operations
- **Dark Mode**: Built-in dark mode support

## Tech Stack

- **Frontend**: Next.js 15+ (App Router), React 19, Tailwind CSS
- **AI**: Vercel AI SDK + Kimi K2 Thinking Model
- **Backend**: Next.js API Routes + Meta Ads MCP Server
- **Deployment**: Railway
- **Tools**: Meta Ads MCP (29+ tools for ads management)

## Architecture

```
┌─────────────────────────────────────┐
│   Next.js App (Railway Service 1)  │
│   ┌─────────────────────────────┐   │
│   │  Chat Interface (React)     │   │
│   └──────────┬──────────────────┘   │
│              │                       │
│   ┌──────────▼──────────────────┐   │
│   │  API Route (/api/chat)      │   │
│   │  - AI SDK Core              │   │
│   │  - MCP Client               │   │
│   └──────┬──────────────┬───────┘   │
└──────────┼──────────────┼───────────┘
           │              │
    ┌──────▼──────┐  ┌───▼─────────────────────┐
    │ Kimi K2     │  │ Meta Ads MCP Server     │
    │ (Moonshot   │  │ (Railway Service 2)     │
    │  AI API)    │  │ - 29+ Meta Ads Tools    │
    └─────────────┘  │ - OAuth Authentication  │
                     │ - HTTP Transport        │
                     └─────────────────────────┘
```

## Prerequisites

1. **Node.js** 18+ and npm
2. **Python** 3.10+ (for MCP server)
3. **Kimi K2 API Key** from [Moonshot AI](https://platform.moonshot.ai/)
4. **Meta App Credentials** (App ID and App Secret)
5. **Railway Account** (for deployment)

## Quick Start

### 1. Clone Repository

```bash
cd meta-ads-mcp/meta-ads-ai-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Kimi K2 API Configuration
KIMI_API_KEY=sk-xxx
KIMI_API_BASE_URL=https://api.moonshot.ai/v1/

# Meta Ads MCP Server Configuration
MCP_SERVER_URL=http://localhost:8080
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
```

### 4. Start Meta Ads MCP Server

In a separate terminal:

```bash
# Windows
start-mcp-server.bat

# Linux/Mac
bash start-mcp-server.sh
```

Or manually:

```bash
cd ..
python -m meta_ads_mcp --transport streamable-http --host 0.0.0.0 --port 8080
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Usage

### Example Prompts

Try asking the AI assistant:

- "Search for interests related to 'fitness'"
- "Show me performance insights for my campaigns"
- "Help me estimate audience size for women aged 25-34 interested in yoga"
- "What are my active ad accounts?"
- "Get campaign performance for the last 7 days"
- "Search for geo-locations in California"

### Available Tools

The assistant has access to 29+ Meta Ads tools:

**Account Management:**
- `get_ad_accounts` - List ad accounts
- `get_account_info` - Get account details
- `get_account_pages` - Get linked Facebook Pages

**Audience Research:**
- `search_interests` - Search targeting interests
- `get_interest_suggestions` - Get related interests
- `estimate_audience_size` - Validate targeting reach
- `search_behaviors` - Search behavior targeting
- `search_demographics` - Search demographic targeting
- `search_geo_locations` - Search locations

**Campaign Analysis:**
- `get_campaigns` - List campaigns
- `get_campaign_details` - Get campaign info
- `get_insights` - Performance metrics with breakdowns

**And many more...**

## Development

### Project Structure

```
meta-ads-ai-app/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts       # Main chat API endpoint
│   │   └── health/
│   │       └── route.ts       # Health check endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── error.tsx              # Error boundary
│   ├── loading.tsx            # Loading state
│   └── not-found.tsx          # 404 page
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx # Main chat component
│   │   ├── message.tsx        # Message display
│   │   └── input.tsx          # Chat input
│   └── tools/
│       ├── data-table.tsx     # Data table component
│       └── metrics-card.tsx   # Metrics display
├── lib/
│   ├── ai-config.ts           # Kimi K2 configuration
│   ├── mcp-client.ts          # MCP client logic
│   └── utils.ts               # Utility functions
├── .env.local                 # Environment variables
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Railway deployment instructions.

### Quick Deploy to Railway

1. Create Railway project for MCP server
2. Create Railway service for Next.js app
3. Set environment variables
4. Deploy both services
5. Connect using Railway private networking

## Configuration

### Kimi K2 Model

The app uses the Kimi K2 Thinking model by default. You can change this in `lib/ai-config.ts`:

```typescript
export const defaultModel = kimi(KimiModels.THINKING);
// or
export const defaultModel = kimi(KimiModels.INSTRUCT);
```

### System Prompt

Customize the assistant's behavior in `lib/ai-config.ts`:

```typescript
export const systemPrompt = `You are a helpful Meta Ads assistant...`;
```

### Generation Config

Adjust AI parameters in `lib/ai-config.ts`:

```typescript
export const defaultGenerationConfig = {
  temperature: 0.7,
  maxTokens: 4096,
  // ...
};
```

## API Endpoints

### POST /api/chat

Main chat endpoint for streaming AI responses.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Show me my campaigns" }
  ]
}
```

**Response:** Streaming text with tool executions

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-15T00:00:00.000Z",
  "services": {
    "app": "ok",
    "mcp": "ok",
    "ai": "configured"
  }
}
```

## Troubleshooting

### MCP Server Connection Failed

- Verify MCP server is running on port 8080
- Check `MCP_SERVER_URL` in `.env.local`
- Review MCP server logs

### Kimi K2 API Errors

- Verify `KIMI_API_KEY` is valid
- Check API quota at https://platform.moonshot.ai/
- Ensure `KIMI_API_BASE_URL` is correct

### Meta OAuth Issues

- Verify `META_APP_ID` and `META_APP_SECRET`
- Check Meta App settings and redirect URIs
- Review token cache location

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project uses the Meta Ads MCP server which is licensed under BUSL-1.1 (becomes Apache 2.0 on Jan 1, 2029).

## Support

- **Issues**: [GitHub Issues](https://github.com/pipeboard-co/meta-ads-mcp/issues)
- **Documentation**: [Meta Ads MCP Docs](https://github.com/pipeboard-co/meta-ads-mcp)
- **AI SDK Docs**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Kimi K2 Docs**: [Moonshot AI](https://platform.moonshot.ai/docs/)

## Credits

- **Meta Ads MCP Server**: [Pipeboard](https://github.com/pipeboard-co/meta-ads-mcp)
- **Vercel AI SDK**: [Vercel](https://sdk.vercel.ai/)
- **Kimi K2 Model**: [Moonshot AI](https://www.moonshot.ai/)
- **Next.js**: [Vercel](https://nextjs.org/)

---

Built with ❤️ using Next.js, AI SDK, and Kimi K2
