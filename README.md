# COMPaSS

COMPaSS is an incident reporting and Tactical Operations Center dispatch-support MVP for Oroquieta City. It has a resident-facing mobile PWA at `/resident` and a live, desktop-first TOC workspace at `/toc`.

## Run locally

1. Install Node 20+ and run `npm install`.
2. Copy `.env.example` to `.env.local`, adding the Supabase project URL and anon key.
3. In Supabase, run `supabase/migrations/001_compass_schema.sql`, then `supabase/seed.sql`.
4. Run `npm run dev` and open the URL shown by Vite.

Without Supabase settings, the UI still runs in demo mode, with local browser storage. Sign in as `resident@demo.com` or `toc@demo.com` using `demo123`.

## Accounts and roles

Public sign-up always creates `resident` records through the `handle_new_user` trigger. Create TOC accounts in Supabase Auth, then update that user’s profile to `toc` using the SQL comment in `supabase/seed.sql`. The `app_role` enum deliberately also includes `officer` for a future officer client.

## Resident PWA

Build and deploy the app over HTTPS. Navigate to `/resident` on a phone and use the browser’s **Install app** / **Add to Home Screen** action. The service worker caches the resident shell; it excludes `/toc` and `/login-for-toc`, so the station dashboard is always fetched live. Offline reporting is intentionally blocked and never queued.

## Privacy and security

The UI uses only the Supabase anon key. Row-level security keeps residents limited to their own reports and prevents them changing status; TOC controls dispatch resources and incident updates. Collect only necessary incident details, use HTTPS in production, control TOC accounts tightly, and define retention/access procedures consistent with the Philippines’ Data Privacy Act of 2012.

## Future Android client

The Android app can use the same Supabase Auth, Storage, Realtime, and Postgres interface. Authorization and audit rules are enforced by database policies and triggers instead of client-side business logic, so they travel unchanged to the native client.
