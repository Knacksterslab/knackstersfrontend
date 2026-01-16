# Admin Dashboard

Complete admin interface for managing Knacksters platform content and settings.

## 🚀 Quick Start

### Access the Admin Dashboard

1. Navigate to: **http://localhost:3000/admin-dashboard**
2. Enter the admin password (default: `admin123`)
3. You're in! 🎉

## 📋 Features

### ✅ Currently Available

#### **Partner Logo Management** (`/admin-dashboard/content/partners`)

Fully functional partner logo manager with:

- **Add New Partners**
  - Upload logo files (SVG, PNG, JPG)
  - Set partner name and category
  - Add optional website URL
  - Toggle active/inactive status

- **Edit Existing Partners**
  - Update partner information
  - Replace logos
  - Change category or status

- **Delete Partners**
  - Remove partners with confirmation

- **Toggle Active Status**
  - Quickly show/hide partners without deleting

- **Real-time Updates**
  - Changes reflect immediately on the landing page
  - No code changes required

### 🔜 Coming Soon

- **User Management** - Manage talents, clients, and business managers
- **Content Editor** - Edit landing page sections
- **Analytics** - Platform metrics and insights
- **Platform Settings** - Configure system-wide settings
- **Announcements** - Send platform-wide notifications

## 🏗️ Architecture

### Routes

```
/admin-dashboard/
├── /                      # Overview dashboard
└── /content/
    └── /partners          # Partner logo management
```

### API Endpoints

```
GET    /api/admin/partners      # Fetch all partners
POST   /api/admin/partners      # Add new partner
PUT    /api/admin/partners      # Update partner
DELETE /api/admin/partners?id=  # Delete partner
POST   /api/admin/upload        # Upload logo file
```

### File Structure

```
app/
├── (admin)/
│   ├── layout.tsx              # Admin layout with auth
│   └── admin-dashboard/
│       ├── page.tsx            # Dashboard overview
│       └── content/
│           └── partners/
│               └── page.tsx    # Partners management
│
├── api/
│   └── admin/
│       ├── partners/
│       │   └── route.ts        # Partner CRUD API
│       └── upload/
│           └── route.ts        # File upload API
│
components/
└── admin/
    ├── AdminSidebar.tsx        # Navigation sidebar
    └── AdminAuthGuard.tsx      # Authentication wrapper
```

## 🔐 Authentication

### Current Implementation (Development)

- **Type**: Simple password protection
- **Storage**: Session-based (sessionStorage)
- **Password**: `admin123` (hardcoded)

### Security Note ⚠️

The current auth is **FOR DEVELOPMENT ONLY**. Before production:

1. **Use environment variables** for password
2. **Implement proper authentication**:
   - NextAuth.js
   - Auth0
   - Clerk
   - Custom JWT solution
3. **Add role-based access control (RBAC)**
4. **Enable HTTPS only**
5. **Add rate limiting**
6. **Implement audit logs**

### To Change Password (Temporary)

Edit `components/admin/AdminAuthGuard.tsx`:

```typescript
// Line 15
const ADMIN_PASSWORD = 'your-secure-password';
```

## 📖 How to Use

### Managing Partner Logos

#### Add a New Partner

1. Go to **Partner Logos** from sidebar
2. Click **"Add Partner"**
3. Fill in the form:
   - **Partner ID**: Unique identifier (e.g., `microsoft`)
   - **Partner Name**: Display name (e.g., `Microsoft`)
   - **Category**: Client or Technology Partner
   - **Upload Logo**: Drag & drop or select file
   - **Website**: (Optional) Company URL
   - **Active**: Check to display on landing page
4. Click **"Add Partner"**
5. Done! ✨

#### Edit a Partner

1. Find the partner card
2. Click the **Edit icon** (pencil)
3. Update information
4. Click **"Update Partner"**

#### Toggle Active/Inactive

1. Find the partner card
2. Click **"Activate"** or **"Deactivate"**
3. Partner visibility updates instantly

#### Delete a Partner

1. Find the partner card
2. Click the **Delete icon** (trash)
3. Confirm deletion

### File Uploads

**Supported Formats:**
- SVG (recommended)
- PNG
- JPG/JPEG

**Best Practices:**
- Use SVG for crisp logos at any size
- Keep files under 1MB
- Use transparent backgrounds (PNG/SVG)
- Follow partner brand guidelines

## 🎨 Customization

### Adding New Admin Pages

1. Create page in `app/(admin)/admin-dashboard/your-page/page.tsx`
2. Add menu item to `components/admin/AdminSidebar.tsx`
3. Create API routes if needed in `app/api/admin/`

Example:

```tsx
// app/(admin)/admin-dashboard/analytics/page.tsx
export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      {/* Your content */}
    </div>
  );
}
```

### Sidebar Customization

Edit `components/admin/AdminSidebar.tsx`:

```tsx
const menuItems = [
  {
    title: 'Your New Section',
    href: '/admin-dashboard/new-section',
    icon: YourIcon,
  },
  // ...
];
```

## 🚀 Production Deployment

### Before Going Live

- [ ] Replace hardcoded password with env variable
- [ ] Implement proper authentication (NextAuth/Auth0)
- [ ] Add role-based permissions
- [ ] Enable HTTPS
- [ ] Add rate limiting to API routes
- [ ] Implement audit logging
- [ ] Add input validation/sanitization
- [ ] Enable CORS protection
- [ ] Add database for partner storage (vs file-based)
- [ ] Implement image optimization

### Environment Variables

Create `.env.local`:

```env
ADMIN_PASSWORD=your-secure-password
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourdomain.com
```

## 🐛 Troubleshooting

### Can't Login

- Check password is correct (`admin123` by default)
- Clear sessionStorage: DevTools → Application → Session Storage
- Refresh page

### Changes Not Reflecting

- Hard refresh the landing page (Ctrl+Shift+R)
- Check browser console for errors
- Verify API responses in Network tab

### Upload Fails

- Check file size (< 5MB)
- Verify file type (SVG, PNG, JPG only)
- Ensure `/public/images/partners/` exists
- Check file permissions

### API Errors

- Check server logs in terminal
- Verify `partner-config.ts` is not corrupted
- Restart dev server: `npm run dev`

## 📊 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React Hooks
- **Storage**: File-based (partner-config.ts)

## 🔄 Future Enhancements

### Short-term
- [ ] Drag-and-drop reordering
- [ ] Bulk operations
- [ ] Search/filter partners
- [ ] Category filtering
- [ ] Export partner list

### Long-term
- [ ] Database integration (Prisma + PostgreSQL)
- [ ] CMS integration (Sanity/Contentful)
- [ ] User management
- [ ] Role-based permissions
- [ ] Audit trail
- [ ] Scheduled publishing
- [ ] Version history
- [ ] API documentation

## 💡 Tips

1. **Use descriptive IDs**: Makes debugging easier
2. **Keep logos consistent**: Similar sizes and styles
3. **Test on mobile**: Ensure responsive design
4. **Regular backups**: Save `partner-config.ts` before major changes
5. **Document changes**: Keep track of what you modify

## 🆘 Support

Need help? Check:
- This README
- Component comments
- API route documentation
- Console logs

---

**Built for Knacksters Platform**  
Version 1.0.0 - January 2026
