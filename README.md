# Kenya Dating App - Location-Based Matchmaking

A modern, location-based online dating platform for people in Kenya to connect, match, and chat.

## Core Concept
Users create profiles, share their location (GPS), and discover nearby matches based on distance, preferences (age, county, interests, tribe, religion, etc.).

## Tech Stack
- **Frontend**: Next.js (App Router) + React + TypeScript + Tailwind CSS
- **Backend / Database / Auth / Realtime / Storage**: Supabase (PostgreSQL + PostGIS + Auth + Realtime + Storage)
- **Chat**: Supabase Realtime or Stream Chat (optional upgrade)
- **Hosting**: Netlify (frontend + serverless) + GitHub
- **Maps / Location**: Browser Geolocation API + PostGIS for distance queries
- **Payments** (optional): M-Pesa via Stripe or local providers

## Key Features (Roadmap)
1. User registration / login (email, Google, phone)
2. Profile setup (photos, bio, age, interests, preferences)
3. GPS location tracking & nearby discovery
4. Matching algorithm (swipe / like / match)
5. Real-time chat
6. Photo uploads (Supabase Storage)
7. Notifications
8. Safety & report system
9. Premium features / subscriptions (optional)
10. Kenya localization: counties, Sheng support, M-Pesa, student/professional modes

## Quick Start

### 1. Supabase Setup
1. Create a free project at [supabase.com](https://supabase.com)
2. Enable the **PostGIS** extension in Database > Extensions
3. Run the SQL in `supabase/schema.sql` in the SQL Editor
4. Create a Storage bucket named `avatars` (public or private with policies)
5. Copy your Project URL and anon key

### 2. Local Development
```bash
git clone https://github.com/gachiesamuel14/kenya-dating-app.git
cd kenya-dating-app
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

### 3. Deploy to Netlify
1. Connect this GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next` (or let Netlify detect Next.js)
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. (Recommended) Install the Supabase Netlify extension for automatic env vars

## Database Schema Highlights
- `profiles` table extending `auth.users`
- Location stored as PostGIS `geography(POINT)` for efficient distance queries
- Functions for `nearby_users(lat, lng, radius_meters)`
- Matches, likes, messages tables
- RLS policies for security

## Localization Ideas for Kenya
- Filter by County (Nairobi, Mombasa, Kisumu, Kiambu, Nakuru, etc.)
- Support for Sheng in bios / chat
- M-Pesa payments for premium
- Modes: Student, Professional, Church/Community

## Next Steps
- Implement auth pages
- Build profile creation flow
- Add geolocation + nearby discovery UI
- Implement swipe matching
- Add real-time chat
- Deploy and iterate

Built with ❤️ for connecting Kenyans.
