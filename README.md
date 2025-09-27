# MERN Full‑Stack Starter (Polished UI/UX)

A production‑style MERN template with JWT auth, protected routes, Tailwind UI, and a CRUD Dashboard.

## Quick Start

```bash
# 1) Backend
cd server
cp .env.example .env    # fill MONGO_URI, JWT_SECRET, CLIENT_URL
npm install
npm run dev             # http://localhost:5000

# 2) Frontend
cd ../client
cp .env.example .env    # VITE_API_URL=http://localhost:5000
npm install
npm run dev             # http://localhost:5173
```

Login/Register in the UI, then create/edit/delete posts on the Dashboard.

## Deploy
- Backend → Render/Railway (set env: PORT, MONGO_URI, JWT_SECRET, CLIENT_URL)
- Frontend → Netlify/Vercel (env: VITE_API_URL = deployed backend URL)
