# Admin Dashboard

Internal admin interface for managing the Knacksters platform.

## Access

Navigate to `/admin-dashboard` — protected by SuperTokens role-based auth (`ADMIN` role required).

## Features

### Partner Logo Management — `/admin-dashboard/content/partners`

- Add, edit, activate/deactivate, and delete partner logos
- Logo files are uploaded to Supabase Storage (`partner-logos` bucket)
- Partner metadata is stored in the `partners` database table
- Changes appear on the landing page within ~60 seconds (no redeploy needed)

### Landing Content — `/admin-dashboard/content/landing`

Edit landing page copy stored in the `site_content` database table.

### Support Tickets — `/admin-dashboard/support`

View and reply to support tickets submitted by clients, managers, and talent.

### Talent Management — `/admin-dashboard/talent`

Review and manage talent applications and profiles.

### Managers — `/admin-dashboard/managers`

Assign and manage account managers (CSMs).

## API Endpoints (admin-only)

```
GET/POST         /api/admin/partners          Partner CRUD
PUT/DELETE       /api/admin/partners/:id
POST             /api/admin/upload            Logo / asset upload (Supabase)
GET/PATCH        /api/admin/talent
GET              /api/admin/managers
GET/PATCH/POST   /api/admin/support/tickets
POST             /api/admin/support/tickets/:id/reply
```

## Tech Stack

- Framework: Next.js (App Router)
- Auth: SuperTokens
- Database: PostgreSQL via Prisma
- File storage: Supabase Storage
- Styling: Tailwind CSS
