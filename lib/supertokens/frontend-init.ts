import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

export function initSuperTokensFrontend() {
  if (typeof window !== 'undefined') {
    SuperTokens.init({
      appInfo: {
        appName: 'Knacksters',
        apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:5000',
        websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'http://localhost:3000',
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
      recipeList: [
        EmailPassword.init(),
        Session.init({
          sessionTokenFrontendDomain: 'localhost',
        }),
      ],
    });
  }
}
