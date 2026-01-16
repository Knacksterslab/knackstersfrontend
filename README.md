# Knacksters Frontend

Modern Next.js 14 application with React, TypeScript, Tailwind CSS, and SuperTokens authentication.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_DOMAIN=http://localhost:5000
NEXT_PUBLIC_WEBSITE_DOMAIN=http://localhost:3000
```

### Running

```bash
# Development server
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

Frontend runs on **http://localhost:3000**

## 📱 Features

### Authentication

- Email/password authentication with SuperTokens
- Multiple login pages for different user types:
  - Client login: `/login`
  - Manager login: `/manager/login`
  - Talent login: `/talent/login`
  - Admin dashboard: `/admin-dashboard`
- Protected routes with `AuthGuard` component
- Role-based access control
- Session management

### User Dashboards

#### Admin Dashboard (`/admin-dashboard`)

- Content management for landing page
- Partner management
- File uploads

#### Manager Dashboard (`/manager-dashboard`)

- Team assignments
- Client management
- Talent management
- Timesheets
- Meet & greet scheduling

#### Talent Dashboard (`/talent-dashboard`)

- Profile management
- Task management
- Timesheet tracking
- Earnings overview
- Support

#### Client Dashboard (`/dashboard`)

- Overview
- Billing & subscription
- Support

### Marketing Pages

- Landing page with hero section
- Solutions pages (AI, Cybersecurity, Development, Design, Marketing, Healthcare)
- How It Works
- FAQ
- Privacy Policy
- Terms of Service
- Pepster partnership page

### Shared Features

- Responsive design for all screen sizes
- Dark mode ready
- Beautiful animations
- Custom SVG components
- Partner logos showcase
- Talent network form
- Schedule flow
- Sign-up process

## 🏗️ Project Structure

```
frontend/
├── app/                          # Next.js 14 App Router
│   ├── (admin)/                  # Admin routes
│   │   ├── admin-dashboard/
│   │   │   ├── content/
│   │   │   │   ├── landing/
│   │   │   │   └── partners/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (app)/                    # Authenticated app routes
│   │   ├── dashboard/
│   │   ├── manager-dashboard/
│   │   ├── talent-dashboard/
│   │   ├── billing/
│   │   ├── support/
│   │   └── layout.tsx
│   ├── (auth)/                   # Auth routes
│   │   ├── login/
│   │   └── layout.tsx
│   ├── (marketing)/              # Public marketing pages
│   │   ├── page.tsx             # Landing page
│   │   ├── solutions/
│   │   ├── how-it-works/
│   │   ├── faq/
│   │   └── layout.tsx
│   ├── manager/                  # Manager-specific login
│   │   └── login/
│   ├── talent/                   # Talent-specific login
│   │   └── login/
│   ├── api/                      # (Deprecated - moved to backend)
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── admin/                    # Admin components
│   ├── auth/                     # Auth components
│   │   ├── AuthGuard.tsx
│   │   ├── AuthLayout.tsx
│   │   └── LoginForm.tsx
│   ├── dashboard/                # Dashboard components
│   ├── manager/                  # Manager components
│   ├── talent/                   # Talent components
│   ├── sections/                 # Landing page sections
│   │   ├── banner.tsx
│   │   ├── BenefitsComponent.tsx
│   │   ├── SolutionsComponent.tsx
│   │   └── ...
│   ├── shared/                   # Shared components
│   ├── ui/                       # UI primitives
│   ├── svg/                      # SVG components
│   └── landing/
│       └── landing-content.ts    # Content configuration
├── lib/
│   ├── api/
│   │   └── client.ts             # API client for backend
│   ├── supertokens/
│   │   ├── config.ts             # SuperTokens config
│   │   └── frontend-config.ts
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── partners/             # Partner logos
│   │   └── ...
│   └── logo.svg
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🔐 Authentication

### Using AuthGuard

Protect routes by wrapping them with `AuthGuard`:

```tsx
import AuthGuard from '@/components/auth/AuthGuard';
import { UserRole } from '@/lib/supertokens/config';

export default function ProtectedPage() {
  return (
    <AuthGuard allowedRoles={[UserRole.ADMIN]}>
      <YourComponent />
    </AuthGuard>
  );
}
```

### API Client

All backend API calls go through the centralized API client:

```typescript
import { apiClient, adminApi } from '@/lib/api/client';

// Using pre-configured admin API
const content = await adminApi.getContent();
await adminApi.updateContent(newContent);

// Using generic client
const data = await apiClient.get('/api/custom-endpoint');
await apiClient.post('/api/endpoint', { data });
```

### SuperTokens Configuration

Located in `lib/supertokens/config.ts`:

```typescript
export const appInfo = {
  appName: "Knacksters",
  apiDomain: "http://localhost:5000",      // Backend URL
  websiteDomain: "http://localhost:3000",  // Frontend URL
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth"
};
```

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework with custom configuration in `tailwind.config.ts`.

### Custom Fonts

- **Inter** - Default sans-serif
- **Public Sans** - Display font
- **Space Mono** - Monospace
- **Lato** - Sans-serif alternative

### Color Scheme

Primary brand colors:
- Primary: `#FF9634` (orange)
- Accent: `#E9414C` (red)
- Background: `rgb(250, 250, 250)`
- Text: `rgb(38, 38, 38)`

## 📦 Key Dependencies

- **next**: ^14.2.0
- **react**: ^18.3.0
- **supertokens-auth-react**: ^0.51.0
- **tailwindcss**: ^3.4.0
- **lucide-react**: ^0.294.0
- **react-toastify**: ^11.0.5

## 🧪 Development Tips

### Hot Reload

Next.js automatically reloads when you make changes to files.

### TypeScript

Strict type checking is enabled. Use proper types for all components and functions.

### Component Organization

- Put reusable UI components in `components/ui/`
- Feature-specific components go in their respective folders
- Use client components (`'use client'`) only when needed

### API Calls

Always use the API client from `lib/api/client.ts` instead of direct fetch calls.

## 🚨 Troubleshooting

### Port already in use

If port 3000 is in use:

```bash
PORT=3001 npm run dev
```

Remember to update `NEXT_PUBLIC_WEBSITE_DOMAIN` in backend.

### API connection errors

Verify backend is running on port 5000 and `NEXT_PUBLIC_API_URL` is correct.

### Authentication not working

1. Check backend is running
2. Verify SuperTokens config matches backend
3. Clear cookies and try again
4. Check browser console for errors

### Images not loading

Images must be in `public/` directory. Reference them as `/images/file.jpg` (starting with `/`).

## 📝 Content Management

Landing page content is configured in `components/landing/landing-content.ts`. Admins can also edit this through the admin dashboard, which updates the file via the backend API.

## 🎯 Best Practices

1. **Use TypeScript** - Type everything properly
2. **Server vs Client Components** - Use server components by default, client components only when needed
3. **API Calls** - Always go through the API client
4. **Error Handling** - Show user-friendly error messages with react-toastify
5. **Loading States** - Show loading indicators for async operations
6. **Responsive Design** - Test on mobile, tablet, and desktop
7. **Accessibility** - Use semantic HTML and ARIA labels

## 📄 License

MIT
