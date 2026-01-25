# Tawk.to Live Chat Setup Instructions

## Why Tawk.to?

- **100% FREE** - No paid plans, completely free forever
- **Unlimited agents** - Add as many team members as you need
- **No credit card required** - Start using immediately after signup
- **Easy integration** - Simple script-based setup

## Setup Steps

### 1. Create Tawk.to Account

1. Go to https://www.tawk.to
2. Click "Sign Up Free" (no credit card required)
3. Create your account with email and password

### 2. Get Your Widget IDs

After logging in:

1. Go to **Administration** (gear icon) → **Property Settings**
2. You'll see:
   - **Property ID**: A string like `5f8abc123def456789ghijkl`
   - **Widget ID**: A string like `default` or `1ab2c3d4e5f6g7h8`

### 3. Add IDs to Environment Variables

Create or update `.env.local` in the project root:

```bash
# Tawk.to Live Chat Configuration
NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id_here
NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id_here
```

**Example:**
```bash
NEXT_PUBLIC_TAWK_PROPERTY_ID=5f8abc123def456789ghijkl
NEXT_PUBLIC_TAWK_WIDGET_ID=default
```

### 4. Restart Dev Server

```bash
npm run dev
```

The chat widget should now appear in the bottom-right corner of your website!

## Customization Options

### In Tawk.to Dashboard:

1. **Appearance** → Customize colors, position, and widget style
2. **Triggers** → Set up automatic greetings and messages
3. **Shortcuts** → Create quick responses for common questions
4. **Departments** → Route chats to different teams (Sales, Support, etc.)
5. **Knowledge Base** → Add FAQ articles that users can search

### Widget Behavior:

- **Auto-expand**: Widget can automatically open for new visitors
- **Offline messages**: Collect messages when agents are offline
- **Pre-chat form**: Collect user info before starting chat
- **Sound notifications**: Alert agents of new messages

## Mobile Apps

Download Tawk.to mobile apps to respond on the go:
- iOS: https://apps.apple.com/app/tawk-to/id633633423
- Android: https://play.google.com/store/apps/details?id=com.tawk.copilot

## Testing

1. Visit your website (http://localhost:3000)
2. Look for the chat widget in the bottom-right corner
3. Click the "Support Chat" link in the footer - widget should maximize
4. Send a test message
5. Check your Tawk.to dashboard to see the message

## Features Included (All Free)

✅ **Unlimited chats**
✅ **Unlimited agents**
✅ **Chat history**
✅ **File sharing**
✅ **Screen sharing**
✅ **Visitor monitoring** - See who's on your site
✅ **Ticketing system**
✅ **Knowledge base**
✅ **Mobile apps**
✅ **Chat triggers & automation**
✅ **Integrations** (Slack, WordPress, Shopify, etc.)

## Support

- Documentation: https://help.tawk.to
- Community: https://community.tawk.to

## Advanced: Setting User Attributes

To pass authenticated user data to Tawk.to, update `components/shared/TawkToChat.tsx`:

```typescript
script.onload = () => {
  if (window.Tawk_API) {
    // Set user attributes
    window.Tawk_API.setAttributes({
      name: 'John Doe',
      email: 'john@example.com',
      hash: 'secure_hash_here' // Optional: for secure mode
    })
  }
}
```

You can integrate this with your UserContext to automatically set user info when they log in.
