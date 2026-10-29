# Karibu Kenya Match - Location-Based Dating for Kenya

A modern, location-based online dating platform for people in Kenya to connect, match, and chat.

**Live site:** https://kenya-dating-app.netlify.app

**GitHub:** https://github.com/gachiesamuel14/kenya-dating-app

## Core Concept
Users create profiles, share their location (GPS), and discover nearby matches based on distance, preferences (age, county, interests, tribe, religion, etc.).

## Tech Stack
- **Frontend**: Next.js (App Router) + React + TypeScript + Tailwind CSS
- **Backend / Database / Auth / Realtime / Storage**: Supabase (PostgreSQL + PostGIS + Auth + Realtime + Storage)
- **Hosting**: Netlify + GitHub
- **Location**: Browser Geolocation API + PostGIS for efficient distance queries
- **Payments** (optional): M-Pesa ready

## Current Features
- Landing page with Kenya localization
- Basic email/password signup & login (`/login`)
- Discover page with GPS location + nearby users query (`/discover`)
- Supabase schema with PostGIS, profiles, nearby_users function, RLS

## Quick Start

### 1. Supabase Setup (Required)
1. Create a free project at [supabase.com](https://supabase.com)
2. Enable the **PostGIS** extension (Database → Extensions)
3. Run the SQL in `supabase/schema.sql` in the SQL Editor
4. Create a Storage bucket named `avatars`
5. Copy Project URL and anon key

### 2. Environment Variables
Add these to Netlify (Site settings → Environment variables) and locally in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Local Development
```bash
git clone https://github.com/gachiesamuel14/kenya-dating-app.git
cd kenya-dating-app
npm install
cp .env.example .env.local
# Fill in the Supabase keys
npm run dev
```

### 4. Deploy
The repo is connected to Netlify at kenya-dating-app.netlify.app. Pushing to main triggers deploys. Ensure env vars are set in Netlify.

## Roadmap
- Profile creation & photo uploads
- Swipe / like / match system
- Real-time chat (Supabase Realtime)
- Filters: county, age, tribe, interests, religion
- Safety / report system
- Premium features + M-Pesa
- Sheng support, student/professional/church modes

## Kenya Localization
- Counties: Nairobi, Mombasa, Kisumu, Kiambu, Nakuru, Eldoret, etc.
- M-Pesa payments
- Local language vibes (Sheng)

Built with ❤️ for connecting Kenyans.
