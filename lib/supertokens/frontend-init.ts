import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

// Track if we've already initialized to prevent double initialization
let isInitialized = false;

export function initSuperTokensFrontend() {
  if (typeof window !== 'undefined' && !isInitialized) {
    isInitialized = true;
    // Get API domain - prioritize NEXT_PUBLIC_API_URL, then NEXT_PUBLIC_API_DOMAIN
    const apiDomain = process.env.NEXT_PUBLIC_API_URL || 
                     process.env.NEXT_PUBLIC_API_DOMAIN || 
                     'http://localhost:5000';
    
    // Get website domain - use current origin in browser, fallback to env var
    const websiteDomain = typeof window !== 'undefined' 
      ? window.location.origin 
      : (process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'http://localhost:3000');

    // Extract domain for session cookies
    // For localhost, use 'localhost', for production use the root domain
    let sessionDomain: string | undefined = undefined;
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        sessionDomain = 'localhost';
      } else {
        // For production, extract root domain (e.g., knacksters.co from app.knacksters.co)
        const parts = hostname.split('.');
        if (parts.length >= 2) {
          // Get last two parts (e.g., ['knacksters', 'co'])
          sessionDomain = parts.slice(-2).join('.');
        }
      }
    }

    SuperTokens.init({
      appInfo: {
        appName: 'Knacksters',
        apiDomain: apiDomain.replace(/\/$/, ''), // Remove trailing slash
        websiteDomain: websiteDomain.replace(/\/$/, ''),
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
      recipeList: [
        EmailPassword.init(),
        Session.init({
          ...(sessionDomain && { sessionTokenFrontendDomain: sessionDomain }),
        }),
      ],
    });
  }
}
