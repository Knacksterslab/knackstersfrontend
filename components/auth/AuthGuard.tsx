'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/supertokens/config';
import Session from 'supertokens-auth-react/recipe/session';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  allowedRoles,
  redirectTo = '/login' 
}: AuthGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if session exists using SuperTokens SDK
        const sessionExists = await Session.doesSessionExist();

        if (!sessionExists) {
          router.push(redirectTo);
          return;
        }

        // Get user ID and role from session
        const userId = await Session.getUserId();
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
        
        // If roles specified, check user role
        if (allowedRoles && allowedRoles.length > 0) {
          const userRole = accessTokenPayload.role;
          
          if (!allowedRoles.includes(userRole)) {
            router.push('/unauthorized');
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectTo, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-[#FF9634] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
