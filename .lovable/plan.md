## Back Office Admin Dashboard for SOLARI

Build a full admin panel at `/admin` where the artist can manage the entire website content, view store orders, see fan club signups, and check site analytics.

### Phase 1 — Database Schema

Create tables for all CMS-managed content plus orders and fan club members.

Tables:
- `news` — title, slug, date, excerpt, content (markdown), tag, published (boolean)
- `tour_dates` — date, city, country, venue, status (onsale/presale/soldout), ticket_url, vip (boolean)
- `albums` — slug, title, year, type, cover_url, tracks, buy_url, stream_url, tagline, sort_order
- `videos` — title, youtube_id, thumb_url, era, director, sort_order
- `merch` — name, price, cover_url, tag (Apparel/Vinyl/Accessories/Prints/Collectibles), active
- `compositions` — title, key, pages, difficulty (Beginner/Intermediate/Advanced), active
- `fan_club_members` — email, name (optional), joined_at
- `orders` — customer_email, items (JSON), total, status (pending/paid/shipped/cancelled), created_at
- `user_roles` — user_id, role enum (admin/moderator/user)
- `profiles` — user_id, display_name, avatar_url

Also create:
- `app_role` enum
- `has_role()` security definer function
- Auto-create profile trigger on signup
- Update triggers for `updated_at`

### Phase 2 — Auth & Role System

- Public auth page at `/auth` — email/password sign-in + sign-up forms
- No anonymous sign-ups; email confirmation required
- After first signup, auto-assign `admin` role via trigger
- `_authenticated` layout for protected routes (integration-managed)
- Admin route guard under `_authenticated/_admin` checking `has_role(auth.uid(), 'admin')`
- `src/lib/admin.functions.ts` — server functions for admin CRUD using `requireSupabaseAuth` + role check

### Phase 3 — Admin Dashboard UI

Route structure under `/admin/*`:
- `/admin` — Dashboard home with stat cards (total members, orders, news items, tour dates) + recent activity
- `/admin/news` — News CRUD table + add/edit modal
- `/admin/tour` — Tour dates CRUD table + add/edit modal
- `/admin/music` — Albums CRUD table + add/edit modal
- `/admin/videos` — Videos CRUD table + add/edit modal
- `/admin/store` — Merch CRUD table + add/edit modal
- `/admin/compositions` — Compositions CRUD table + add/edit modal
- `/admin/fan-club` — Fan club members table with search/export
- `/admin/orders` — Orders table with status management

Shared admin components:
- `AdminLayout` — sidebar nav, header with user menu, logout
- `AdminSidebar` — collapsible sidebar with icons, active route highlighting
- `DataTable` — reusable table with sorting, search, pagination
- `CrudModal` — reusable create/edit form modal with validation
- `StatCard` — dashboard stat widgets

Styling: Keep the midnight gold theme. Admin uses a darker, denser UI with the same color tokens. Sidebar uses `bg-secondary`, content area `bg-background`.

### Phase 4 — Public Site Integration

Replace static `site-data.ts` reads with database queries:
- Home page → fetch latest album, news, tour dates, videos from DB
- Music page → fetch albums from DB
- Videos page → fetch videos from DB
- News page → fetch news from DB
- Tour page → fetch tour dates + VIP tiers from DB
- Store page → fetch merch from DB
- Compositions page → fetch compositions from DB
- Fan Club bar → write emails to `fan_club_members` table

Use `createServerFn` for public reads with a server publishable client + narrow `TO anon` SELECT policies.

### Phase 5 — Analytics

Simple dashboard stats computed from DB counts:
- Total fan club members (with growth chart)
- Total orders + revenue
- Content counts by type
- Recent signups list
- Recent orders list

Use recharts for simple bar/line charts on the admin dashboard.

### Technical Details

- Server functions for all admin CRUD using `requireSupabaseAuth`
- Role verification in every admin function via `has_role()` RPC
- Input validation with Zod on all forms
- Public site reads use `TO anon` policies for published content only
- RLS: admin can read/write all tables; public can only read published content; no anon writes
- Fan club form writes via public server route with validation
- Use TanStack Query for client-side data fetching with `useSuspenseQuery` / `useMutation`