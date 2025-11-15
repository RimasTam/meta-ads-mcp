# 🚀 START HERE: Step-by-Step Deployment

Follow these steps **in order**. Check off each step as you complete it.

---

## ⏱️ Estimated Time: 30-45 minutes

---

## STEP 1: Get Meta Developer Credentials (10 min)

### What you need
- Meta/Facebook account
- Access to https://developers.facebook.com

### Actions

1. - [ ] Go to https://developers.facebook.com
2. - [ ] Click **"My Apps"** → **"Create App"**
3. - [ ] Choose: **"Business"** (or "Other")
4. - [ ] App Name: `Meta Ads MCP Server` (or your choice)
5. - [ ] Email: Your contact email
6. - [ ] Click **"Create App"**
7. - [ ] In left sidebar: Click **"Add Product"**
8. - [ ] Find **"Marketing API"** → Click **"Set Up"**
9. - [ ] Go to **App Settings** → **Basic**
10. - [ ] **COPY THESE** (save in notepad):
    ```
    App ID: ________________
    App Secret: ____________ (click "Show" first)
    ```

✅ You now have Meta credentials!

---

## STEP 2: Get Kimi API Key (5 min)

### What you need
- Your existing Kimi API key

### Actions

1. - [ ] Locate your Kimi API key (starts with `sk-`)
2. - [ ] **COPY THIS** (save in notepad):
    ```
    Kimi API Key: ________________
    ```

✅ You have your Kimi API key ready!

---

## STEP 3: Push Meta Ads MCP to GitHub (5 min)

### What you need
- GitHub account
- Git installed on your computer

### Actions

1. - [ ] Open Terminal/Command Prompt
2. - [ ] Navigate to your project:
    ```bash
    cd C:\Users\Rimas\Desktop\Projects\meta-ads-mcp\meta-ads-mcp-server
    ```

3. - [ ] Check git status:
    ```bash
    git status
    ```

4. - [ ] Add all files:
    ```bash
    git add .
    git commit -m "Ready for Railway deployment"
    ```

5. - [ ] Create a **new GitHub repository**:
    - Go to https://github.com/new
    - Repository name: `meta-ads-mcp-server`
    - Visibility: **Private** (recommended)
    - Click **"Create repository"**

6. - [ ] Push to GitHub (replace YOUR_USERNAME):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/meta-ads-mcp-server.git
    git branch -M main
    git push -u origin main
    ```

7. - [ ] Verify files are on GitHub (refresh the page)

✅ Meta Ads MCP Server is on GitHub!

---

## STEP 4: Deploy Meta Ads MCP to Railway (5 min)

### What you need
- Railway account (login at https://railway.app)
- GitHub repo from Step 3

### Actions

1. - [ ] Go to https://railway.app
2. - [ ] Click **"New Project"**
3. - [ ] Click **"Deploy from GitHub repo"**
4. - [ ] Authorize Railway to access GitHub (if first time)
5. - [ ] Select: **`meta-ads-mcp-server`** repository
6. - [ ] Railway will auto-detect config and start building
7. - [ ] Wait for build to complete (~2-3 minutes)

8. - [ ] Click on your deployed service (the purple box)
9. - [ ] Go to **"Variables"** tab
10. - [ ] Click **"+ New Variable"**, add:
    ```
    Variable: META_APP_ID
    Value: [paste from Step 1]
    ```
11. - [ ] Click **"+ New Variable"**, add:
    ```
    Variable: META_APP_SECRET
    Value: [paste from Step 1]
    ```

12. - [ ] Go to **"Settings"** tab
13. - [ ] Scroll to **"Networking"** → **"Public Networking"**
14. - [ ] Click **"Generate Domain"**
15. - [ ] **COPY THIS URL** (save in notepad):
    ```
    MCP Server URL: https://____________.railway.app
    ```

✅ Meta Ads MCP Server is live on Railway!

---

## STEP 5: Test MCP Server (2 min)

### What you need
- MCP Server URL from Step 4
- Command line or REST client

### Actions

1. - [ ] Open Terminal/Command Prompt
2. - [ ] Run this command (replace YOUR-URL):
    ```bash
    curl https://YOUR-URL.railway.app/mcp -H "Content-Type: application/json" -H "X-META-ACCESS-TOKEN: test" -d "{\"jsonrpc\":\"2.0\",\"method\":\"tools/list\",\"id\":1}"
    ```

3. - [ ] **Expected**: You should see JSON with 29 tools listed

✅ MCP Server is working!

---

## STEP 6: Create LibreChat Config Repo (5 min)

### What you need
- GitHub account
- The `librechat.yaml` file from this directory

### Actions

1. - [ ] Open `librechat.yaml` in a text editor
2. - [ ] Find line with `url: "${META_ADS_MCP_URL}/mcp"`
3. - [ ] Replace with (use YOUR Railway URL from Step 4):
    ```yaml
    url: "https://YOUR-MCP-URL.railway.app/mcp"
    ```
4. - [ ] Save the file

5. - [ ] Create a **new GitHub repository**:
    - Go to https://github.com/new
    - Repository name: `librechat-config`
    - Visibility: **Public** (important!)
    - Click **"Create repository"**

6. - [ ] In a NEW folder/directory, push the config:
    ```bash
    mkdir C:\Users\Rimas\Desktop\librechat-config
    cd C:\Users\Rimas\Desktop\librechat-config

    # Copy librechat.yaml to this folder
    copy C:\Users\Rimas\Desktop\Projects\meta-ads-mcp\meta-ads-mcp-server\librechat.yaml .

    git init
    git add librechat.yaml
    git commit -m "LibreChat configuration"
    git remote add origin https://github.com/YOUR_USERNAME/librechat-config.git
    git branch -M main
    git push -u origin main
    ```

7. - [ ] Go to your GitHub repo: `https://github.com/YOUR_USERNAME/librechat-config`
8. - [ ] Click on **`librechat.yaml`**
9. - [ ] Click **"Raw"** button
10. - [ ] **COPY THIS URL** (save in notepad):
    ```
    Config URL: https://raw.githubusercontent.com/YOUR_USERNAME/librechat-config/main/librechat.yaml
    ```

✅ LibreChat config is hosted on GitHub!

---

## STEP 7: Generate LibreChat Security Keys (2 min)

### What you need
- Web browser

### Actions

1. - [ ] Go to: https://www.librechat.ai/toolkit/creds_generator
2. - [ ] Click **"Generate"**
3. - [ ] **COPY THESE** (save in notepad):
    ```
    CREDS_KEY: ________________
    CREDS_IV: ________________
    ```

✅ Security credentials generated!

---

## STEP 8: Deploy LibreChat to Railway (5 min)

### What you need
- Railway account
- All values from previous steps

### Actions

1. - [ ] Go to: https://railway.app/template/b5k2mn
2. - [ ] Click **"Deploy Now"**
3. - [ ] Railway will set up 3 services (LibreChat, MongoDB, Meilisearch)
4. - [ ] Wait for initial deployment (~3 minutes)

5. - [ ] Click on **"LibreChat"** service (not MongoDB)
6. - [ ] Go to **"Variables"** tab
7. - [ ] Click **"+ New Variable"** and add **each of these**:

    ```env
    CONFIG_PATH
    [Paste Config URL from Step 6]

    KIMI_API_KEY
    [Paste Kimi API Key from Step 2]

    META_ADS_MCP_URL
    [Paste MCP Server URL from Step 4]

    ENDPOINTS
    openAI,anthropic,google,custom

    CREDS_KEY
    [Paste from Step 7]

    CREDS_IV
    [Paste from Step 7]

    META_ACCESS_TOKEN
    placeholder
    ```

8. - [ ] Wait for auto-redeploy (~2 minutes)

9. - [ ] Go to **"Settings"** tab
10. - [ ] Scroll to **"Networking"** → **"Public Networking"**
11. - [ ] Click **"Generate Domain"**
12. - [ ] **COPY THIS URL** (save in notepad):
    ```
    LibreChat URL: https://____________.railway.app
    ```

✅ LibreChat is deployed!

---

## STEP 9: Access LibreChat & Create Account (3 min)

### What you need
- LibreChat URL from Step 8

### Actions

1. - [ ] Open browser and go to your LibreChat URL
2. - [ ] Click **"Sign Up"**
3. - [ ] Enter:
    - Email: Your email
    - Password: Strong password (min 8 chars)
    - Confirm password
4. - [ ] Click **"Sign Up"**
5. - [ ] You should be automatically logged in

✅ You're in LibreChat!

---

## STEP 10: Test Kimi K2 Model (2 min)

### Actions

1. - [ ] In LibreChat, click the **model selector** at the top
2. - [ ] Look for **"Kimi K2"** in the endpoints list
3. - [ ] Select **"Kimi K2"** → **"kimi-k2-0711"**
4. - [ ] Send message: `Hello! Please respond with OK to confirm you're working.`
5. - [ ] **Expected**: Kimi should respond within 5-10 seconds

✅ Kimi K2 is working!

---

## STEP 11: Enable Meta Ads MCP Tools (2 min)

### Actions

1. - [ ] Look below the chat input box
2. - [ ] You should see a tools/MCP dropdown or icon
3. - [ ] Click to expand
4. - [ ] Find **"meta-ads"** in the list
5. - [ ] Enable/select it
6. - [ ] Should show 29 tools available

✅ MCP tools are enabled!

---

## STEP 12: Authenticate with Meta (5 min)

### Actions

**Option A: Using get_login_link tool**

1. - [ ] With meta-ads enabled, send message:
    ```
    Please use the get_login_link tool to help me authenticate with Meta Ads API.
    ```
2. - [ ] Kimi will call the tool and provide a URL
3. - [ ] Click the OAuth URL
4. - [ ] Login to Meta/Facebook
5. - [ ] Grant permissions
6. - [ ] Complete authentication

**Option B: Manual token** (if Option A doesn't work)

1. - [ ] Go to: https://developers.facebook.com/tools/explorer
2. - [ ] Select your app
3. - [ ] Click **"Get User Access Token"**
4. - [ ] Select permissions: `ads_management`, `ads_read`, `business_management`
5. - [ ] Click **"Generate Access Token"**
6. - [ ] Copy the token
7. - [ ] In Railway → LibreChat service → Variables
8. - [ ] Update `META_ACCESS_TOKEN` with the token
9. - [ ] Redeploy

✅ Meta authentication complete!

---

## STEP 13: Test Meta Ads Tools (5 min)

### Actions

1. - [ ] In LibreChat, send:
    ```
    Please list all my Meta ad accounts.
    ```

2. - [ ] **Expected**: Kimi should:
    - Call `get_ad_accounts` tool
    - Show your Meta ad accounts
    - Display account IDs and names

3. - [ ] If successful, try:
    ```
    Show me all active campaigns in account act_XXXXXX
    ```
    (Replace act_XXXXXX with your account ID from previous response)

4. - [ ] **Expected**: Kimi should:
    - Call `get_campaigns` tool
    - List your campaigns

✅ Everything is working perfectly!

---

## 🎉 CONGRATULATIONS!

You have successfully deployed:
- ✅ Meta Ads MCP Server on Railway
- ✅ LibreChat on Railway
- ✅ Kimi K2 AI model integration
- ✅ Full MCP tools integration

---

## 🎯 What's Next?

### Try These Commands:

1. **Campaign Analysis**:
   ```
   Analyze the performance of all my active campaigns over the last 30 days and recommend optimizations.
   ```

2. **Targeting Research**:
   ```
   Search for targeting interests related to "fitness" and "healthy living" and show me the audience sizes.
   ```

3. **Performance Insights**:
   ```
   Get detailed insights for campaign XXXXX and explain which metrics need attention.
   ```

### Explore the Tools:

- 29 Meta Ads tools available
- Check `QUICK_REFERENCE.md` for full list
- Try complex multi-step workflows
- Build custom agents for specific tasks

### Learn More:

- **DEPLOYMENT_GUIDE.md** - Full deployment details
- **TESTING_GUIDE.md** - Comprehensive testing procedures
- **QUICK_REFERENCE.md** - Quick access to key information

---

## 🆘 Having Issues?

### Quick Fixes:

1. **Kimi not appearing**: Check `CONFIG_PATH` in Railway variables
2. **MCP not connecting**: Verify URL in librechat.yaml matches Railway
3. **Auth errors**: Use `get_login_link` tool or get manual token
4. **Tools not showing**: Ensure `chatMenu: true` in librechat.yaml

### Get Help:

- Check Railway logs: Dashboard → Service → Deployments → Logs
- Review troubleshooting in DEPLOYMENT_GUIDE.md
- Test each component independently

---

## 📊 Your Setup Summary

Once complete, you should have:

| Component | Location | URL |
|-----------|----------|-----|
| **Meta Ads MCP** | Railway | `https://_______.railway.app` |
| **LibreChat** | Railway | `https://_______.railway.app` |
| **Config File** | GitHub | `github.com/USERNAME/librechat-config` |
| **MCP Code** | GitHub | `github.com/USERNAME/meta-ads-mcp-server` |

---

## 💡 Pro Tips

1. **Bookmark your LibreChat URL** - That's your main interface
2. **Save your environment variables** - Keep them secure but accessible
3. **Monitor Railway usage** - Set up billing alerts
4. **Test regularly** - Use TESTING_GUIDE.md for maintenance
5. **Backup MongoDB** - Your conversations are stored there

---

**Need help?** Review the detailed guides:
- 📖 DEPLOYMENT_GUIDE.md (complete instructions)
- 🧪 TESTING_GUIDE.md (testing procedures)
- ⚡ QUICK_REFERENCE.md (quick lookups)

**Enjoy your AI-powered Meta Ads management system!** 🚀
