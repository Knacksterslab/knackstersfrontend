# Partner Logos

Partner logos are managed through the admin dashboard and stored in the database.

## How to manage partners

Go to **Admin Dashboard → Content → Partner Logos** (`/admin-dashboard/content/partners`).

From there you can:
- **Add** a partner — upload a logo (uploaded to Supabase Storage), set a name, category, and optional website URL
- **Edit** — update any field or replace the logo
- **Activate / Deactivate** — toggle visibility on the landing page without deleting
- **Delete** — permanently remove

Changes appear on the landing page within ~60 seconds (ISR revalidation).

## Logo guidelines

- Preferred format: PNG with transparent background or SVG
- Keep files under 2 MB
- Follow partner brand guidelines

## Architecture

- Partner data: PostgreSQL `partners` table (via Prisma)
- Logo files: Supabase Storage `partner-logos` bucket
- Public API: `GET /api/partners` (active partners only, cached 60 s)
- Admin API: `GET/POST/PUT/DELETE /api/admin/partners` (auth required)
- Landing page: `PartnersComponent` — async Next.js server component with `revalidate: 60`
