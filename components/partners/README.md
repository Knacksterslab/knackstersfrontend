# Partner Logos Management

This directory contains the partner logos section and configuration.

## Structure

```
partners/
├── PartnersComponent.tsx    # Main component that displays partners
├── partner-config.ts         # Configuration file for all partners
├── PartnerLogos.tsx         # (Legacy) SVG components - can be deleted
└── README.md                # This file
```

## How to Add a New Partner Logo

### 1. Add the Logo File

Place the logo file in `/public/images/partners/`:
- **Preferred format**: SVG (scalable, small file size)
- **Alternative**: PNG with transparent background
- **File naming**: Use lowercase with hyphens (e.g., `company-name.svg`)

### 2. Update the Config

Edit `partner-config.ts` and add a new entry:

```typescript
{
  id: 'company-id',           // Unique identifier
  name: 'Company Name',       // Display name
  logoUrl: '/images/partners/company-name.svg',
  active: true,               // Set to false to hide without deleting
  category: 'client',         // 'client' or 'technology'
  website: 'https://...'      // (Optional) Company website
}
```

### 3. That's It!

The component will automatically display the new logo. No code changes needed.

## How to Remove a Partner Logo

### Temporary (Hide)
Set `active: false` in `partner-config.ts`:

```typescript
{
  id: 'company-id',
  name: 'Company Name',
  active: false,  // ← Logo won't display but config preserved
  // ...
}
```

### Permanent (Delete)
1. Remove the entry from `partner-config.ts`
2. Delete the logo file from `/public/images/partners/`

## How to Reorder Logos

Simply reorder the array in `partner-config.ts`. The logos display in array order.

## Filter by Category

Use the helper functions:

```typescript
import { getPartnersByCategory } from './partner-config';

// Get only client logos
const clients = getPartnersByCategory('client');

// Get only technology partner logos
const techPartners = getPartnersByCategory('technology');
```

## Logo Guidelines

When obtaining real partner logos:
1. **Get permission** - Use official brand assets or press kits
2. **Follow brand guidelines** - Respect spacing, colors, sizing
3. **Use SVG when possible** - Better quality and performance
4. **Optimize files** - Use SVGO or TinyPNG to reduce file size
5. **Check licensing** - Ensure you have rights to use the logo

## Technical Details

- **Component**: Next.js Image component for automatic optimization
- **Responsive**: Grid adapts from 2 columns (mobile) to 4 columns (desktop)
- **Performance**: Lazy loading and proper sizing hints
- **Accessibility**: Alt text from partner name
- **Hover effect**: Opacity fade on hover

## Future Enhancements

Possible improvements you could add:

- **Links**: Click logos to visit partner websites (use `website` field)
- **Dark mode**: Add `logoUrlDark` for dark theme variants
- **Tooltips**: Show partner info on hover
- **Filtering**: Filter by category dynamically
- **Animation**: Fade in logos on scroll
- **CMS Integration**: Load partners from a headless CMS
