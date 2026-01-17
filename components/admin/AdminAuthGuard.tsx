'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';
import Session from 'supertokens-auth-react/recipe/session';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      // Check if user has a valid session
      const hasSession = await Session.doesSessionExist();
      
      if (!hasSession) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      setIsAuthenticated(true);

      // Get user role from session
      const userId = await Session.getUserId();
      const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
      
      const role = accessTokenPayload.role;
      const email = accessTokenPayload.email;
      
      setUserEmail(email || '');

      // Check if user has ADMIN role
      if (role === 'ADMIN') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      setIsChecking(false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsChecking(false);
    }
  };

  // Loading state
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
              <p className="text-sm text-gray-500">Please log in to continue</p>
            </div>

            {/* Login Button */}
            <button
              onClick={() => router.push('/login')}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              Go to Login
            </button>

            {/* Helper Text */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                Log in with your admin account credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated but not admin - show access denied
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-red-200">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
              <p className="text-sm text-gray-500 mb-4">You don't have admin privileges</p>
              {userEmail && (
                <p className="text-xs text-gray-400">Logged in as: {userEmail}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Go to Dashboard
              </button>
              <button
                onClick={async () => {
                  await Session.signOut();
                  router.push('/login');
                }}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>

            {/* Helper Text */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-xs text-red-600 text-center">
                Contact your administrator if you believe this is an error
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated and is admin - show content
  return <>{children}</>;
}
