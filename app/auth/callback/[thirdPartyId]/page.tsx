'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInAndUp } from 'supertokens-auth-react/recipe/thirdparty';
import Logo from '@/components/ui/logo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function routeBySession(router: ReturnType<typeof useRouter>, API_URL: string) {
  const sessionRes = await fetch(`${API_URL}/api/auth/session`, { credentials: 'include' });
  const sessionData = await sessionRes.json();
  const user = sessionData?.data;
  if (!user?.id) return false;

  const userRole: string = user.role?.toLowerCase() || 'client';
  if (userRole !== 'client') {
    const dashboardMap: Record<string, string> = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      talent: '/talent-dashboard',
    };
    router.push(dashboardMap[userRole] || '/client-dashboard');
    return true;
  }

  if (!user.selectedSolution) {
    router.push('/onboarding');
    return true;
  }

  if (!user.hasMeeting) {
    router.push('/schedule/client');
    return true;
  }

  router.push('/client-dashboard');
  return true;
}

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-invocation in development.
    // Without this, two concurrent signInAndUp() calls race to exchange the
    // same single-use OAuth code — one wins, one gets invalid_grant → 500.
    if (hasRun.current) return;
    hasRun.current = true;

    async function handleCallback() {
      try {
        const response = await signInAndUp();

        if (response.status === 'OK') {
          await routeBySession(router, API_URL);
        } else if (response.status === 'NO_EMAIL_GIVEN_BY_PROVIDER') {
          setError('Google did not provide an email address. Please use a Google account with an email address.');
        } else if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
          setError(response.reason || 'Sign in is not allowed. Please contact support.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        // signInAndUp() can throw when the backend returns 500 (e.g. a transient
        // SuperTokens Core hiccup). The session may still have been established
        // before the error — check before showing a failure message.
        try {
          const routed = await routeBySession(router, API_URL);
          if (!routed) setError('Failed to complete sign-in. Please try again.');
        } catch {
          setError('Failed to complete sign-in. Please try again.');
        }
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col items-center justify-center">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 max-w-md w-full mx-4 text-center">
        {error ? (
          <>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign-in Failed</h2>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="animate-spin w-7 h-7 text-[#FF9634]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign-in…</h2>
            <p className="text-gray-500 text-sm">Please wait while we verify your Google account.</p>
          </>
        )}
      </div>
    </div>
  );
}
