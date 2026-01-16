import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./config";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        signInAndUpFeature: {
          signInForm: {
            // We'll use custom UI, so we disable the default form
            style: `
              [data-supertokens~=container] {
                display: none;
              }
            `,
          },
        },
        // Override default routing to use our custom pages
        getRedirectionURL: async (context) => {
          // Redirect handled by our custom logic
          return undefined;
        },
      }),
      SessionReact.init(),
    ],
  };
};
