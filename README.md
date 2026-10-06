# surveyankle

DailyZap is a very simple experimental Next.js website.

## What it is

1. **Homepage (`/`)**  
   A weird, fun website overloaded with fictional "ADVERTISEMENT — DEMO" ads. Branding is random (DailyZap). Not related to coding.

2. **`/code`**  
   A clean, simple programming code library.  
   - Browse subjects  
   - Open programs  
   - Copy code with one click

3. **`/admin`**  
   Tiny password-protected admin panel to create subjects and publish programs.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file and set DATABASE_URL to a Neon Postgres connection string
cp .env.example .env

# 3. (Optional) change the admin password in .env
# ADMIN_PASSWORD=your-own-password

# 4. Run
npm run dev
```

Open http://localhost:3000

- Homepage: lots of fake ads
- Go to http://localhost:3000/code for the useful part
- Admin: http://localhost:3000/admin  
  Default password: `supersecret123`

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import in Vercel
3. Add environment variable:
   - `ADMIN_PASSWORD` = your secret password
4. In the Vercel project, open **Storage**, create a **Neon Postgres** database,
   and connect it to this project for Production (and Preview if needed).
5. Confirm Vercel has set the `DATABASE_URL` environment variable, then deploy.

The app stores subjects and programs in Postgres. On the first connection to an
empty database, it imports the starter content from `data/db.json` once. Admin
changes are then saved in Postgres and persist across deployments and serverless
restarts. For local development, set `DATABASE_URL` in `.env` to a Neon
connection string before running the app.

## Project Structure

```
app/
  page.tsx              → weird homepage full of demo ads
  code/
    page.tsx            → list of subjects
    [subject]/page.tsx → programs in a subject
    [subject]/[program]/page.tsx → code + COPY button
  admin/
    page.tsx            → dashboard (protected)
    login/page.tsx
  api/
    login/ route
    logout/ route
    subjects/ route
    programs/ route
components/
  FakeAd.tsx
  CopyButton.tsx
  AdminDashboard.tsx
lib/
  store.ts              → simple JSON file storage
  auth.ts               → cookie-based admin session
data/
  db.json               → sample data (seeded)
```

## Features (exactly what was requested)

- Fake advertisements clearly labeled **ADVERTISEMENT — DEMO**
- Clean `/code` section
- Admin can:
  - Login with password from env
  - Create / delete subjects
  - Add / edit / delete programs
  - Publish code
  - Logout
- One-click COPY CODE
- Responsive (mobile friendly)
- No database, no Prisma, no NextAuth, no complex stuff

That's it. Keep it simple.
