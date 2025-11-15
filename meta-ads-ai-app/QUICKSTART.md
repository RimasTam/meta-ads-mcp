# Quick Start Guide

Get your Meta Ads AI Assistant running in 5 minutes!

## Step 1: Get API Keys

### Kimi K2 API Key
1. Visit https://platform.moonshot.ai/
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy your API key (starts with `sk-`)

### Meta App Credentials
1. Visit https://developers.facebook.com/
2. Go to "My Apps" → "Create App"
3. Choose "Business" app type
4. Fill in app details
5. Go to Settings → Basic
6. Copy "App ID" and "App Secret"

## Step 2: Configure Environment

1. Navigate to the app directory:
```bash
cd meta-ads-mcp/meta-ads-ai-app
```

2. Copy environment template:
```bash
cp .env.local.example .env.local
```

3. Edit `.env.local` with your credentials:
```env
KIMI_API_KEY=sk-your-kimi-api-key-here
KIMI_API_BASE_URL=https://api.moonshot.ai/v1/
MCP_SERVER_URL=http://localhost:8080
META_APP_ID=your-meta-app-id
META_APP_SECRET=your-meta-app-secret
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start MCP Server

**Windows:**
```bash
start-mcp-server.bat
```

**Mac/Linux:**
```bash
bash start-mcp-server.sh
```

**Manual:**
```bash
cd ..
python -m meta_ads_mcp --transport streamable-http --host 0.0.0.0 --port 8080
```

## Step 5: Start Next.js App

In a new terminal:

```bash
cd meta-ads-mcp/meta-ads-ai-app
npm run dev
```

## Step 6: Open Browser

Visit http://localhost:3000

You should see the Meta Ads AI Assistant interface!

## First Steps

1. **Authenticate with Meta**: The first time you use the app, you'll need to authenticate with your Meta account through OAuth.

2. **Try Example Prompts**: Click on any of the example prompts to get started:
   - "Search for interests related to 'fitness'"
   - "Show me performance insights for my campaigns"
   - "What are my active ad accounts?"

3. **Ask Questions**: Type your own questions about Meta Ads, campaigns, targeting, or insights.

## Troubleshooting

### "MCP Server Connection Failed"
- Make sure the MCP server is running (check Step 4)
- Verify port 8080 is not in use by another application
- Check `MCP_SERVER_URL` in `.env.local` is `http://localhost:8080`

### "Kimi K2 API Error"
- Verify your API key is correct in `.env.local`
- Check you have credits at https://platform.moonshot.ai/
- Ensure `KIMI_API_BASE_URL` is correct

### "Meta Authentication Failed"
- Verify `META_APP_ID` and `META_APP_SECRET` are correct
- Make sure your Meta App is properly configured
- Try the OAuth flow again

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for Railway deployment
- Explore the codebase to customize the assistant

## Support

Need help? Open an issue at:
https://github.com/pipeboard-co/meta-ads-mcp/issues

---

Happy advertising with AI! 🚀
