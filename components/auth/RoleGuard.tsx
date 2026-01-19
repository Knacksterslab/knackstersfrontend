'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Session from 'supertokens-auth-react/recipe/session';

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RoleGuard({ 
  allowedRoles, 
  children, 
  redirectTo = '/' 
}: RoleGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      try {
        const hasSession = await Session.doesSessionExist();
        
        if (!hasSession) {
          router.push('/login');
          return;
        }

        const payload = await Session.getAccessTokenPayloadSecurely();
        const userRole = payload.role;

        if (!allowedRoles.includes(userRole)) {
          // User has wrong role, redirect to their correct dashboard
          const roleRedirects: Record<string, string> = {
            'admin': '/admin-dashboard',
            'manager': '/manager-dashboard',
            'talent': '/talent-dashboard',
            'client': '/client-dashboard',
          };
          
          router.push(roleRedirects[userRole] || redirectTo);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Role check failed:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    checkRole();
  }, [allowedRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
