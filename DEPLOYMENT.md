# Windows Plesk Deployment

This frontend is a Node-hosted Next.js app, not a static export.

## Plesk Node.js settings

- Domain: `oneklient.com`
- Application root: this repository root
- Document root: this repository root
- Startup file: `server.js`
- Application mode: `Production`

## Deployment commands

Run these from Plesk after Git pull:

```powershell
npm ci
npm run build
```

Then restart the Node.js app.

## Environment

Create `.env` on the server from `.env.example` and set:

```text
BACKEND_API_URL=https://api.oneklient.com
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_WITH_CREDENTIALS=false
```

Leaving `NEXT_PUBLIC_API_URL` empty makes the browser call `/api/*` on the main domain. The Next.js server proxies those requests to `BACKEND_API_URL`, which avoids browser CORS problems between the main domain and API subdomain.
