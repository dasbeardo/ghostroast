# Deploying the Roast Mortem API Proxy

This Cloudflare Worker proxies OpenAI API requests so you can share the game with friends without exposing your API key.

## Prerequisites

1. A Cloudflare account (free): https://dash.cloudflare.com/sign-up
2. Node.js installed on your computer
3. Your OpenAI API key

## Step-by-Step Deployment

### 1. Install Wrangler (Cloudflare CLI)

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This opens a browser to authenticate.

### 3. Deploy the Worker

From this `worker/` directory:

```bash
cd /path/to/roastaghost/worker
wrangler deploy
```

After deployment, you'll see a URL like:
```
https://roast-mortem-api.<your-subdomain>.workers.dev
```

**Copy this URL** - you'll need it in step 5.

### 4. Set Your Secrets

Set your OpenAI API key (this is stored securely by Cloudflare, never exposed):

```bash
wrangler secret put OPENAI_API_KEY
```

When prompted, paste your OpenAI API key.

Set the password your friends will use:

```bash
wrangler secret put ACCESS_PASSWORD
```

When prompted, enter a password you'll share with friends (e.g., "ghostbusters2024").

### 5. Update the Game

Edit `js/state.js` and set the PROXY_URL:

```javascript
export const PROXY_URL = 'https://roast-mortem-api.your-subdomain.workers.dev';
```

### 6. Deploy the Game

Host the game files anywhere static:
- GitHub Pages (free)
- Netlify (free)
- Cloudflare Pages (free)
- Any web server

### 7. Share with Friends

1. Send them the game URL
2. Give them the password you set in step 4
3. They enter the password and play!

## Security Notes

- Your API key is stored as a Cloudflare secret - it never leaves their servers
- The password is also stored as a secret
- Friends only need the password, never your API key
- Cloudflare's free tier includes 100,000 requests/day (plenty for casual testing)

## Updating the Password

To change the password later:

```bash
wrangler secret put ACCESS_PASSWORD
```

## Monitoring Usage

Check your Cloudflare dashboard to see request counts:
https://dash.cloudflare.com → Workers & Pages → roast-mortem-api

## Troubleshooting

**"Invalid access password" error:**
- Make sure you set the ACCESS_PASSWORD secret correctly
- Try `wrangler secret put ACCESS_PASSWORD` again

**"Connection error":**
- Check that the PROXY_URL in state.js matches your worker URL exactly
- Make sure the worker deployed successfully

**API errors:**
- Check your OpenAI account has credits
- Verify your API key is correct with `wrangler secret put OPENAI_API_KEY`
