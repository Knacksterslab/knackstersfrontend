'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle, Mail, Eye, EyeOff } from 'lucide-react';
import Session from 'supertokens-auth-react/recipe/session';
import { signIn } from 'supertokens-auth-react/recipe/emailpassword';
import { userRoles } from '@/lib/supertokens/config';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

      // Check if user has ADMIN role (role is lowercase in session)
      if (role === userRoles.ADMIN) {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const response = await signIn({
        formFields: [
          { id: 'email', value: email },
          { id: 'password', value: password },
        ],
      });

      if (response.status === 'OK') {
        // Check if logged in user is admin
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
        const userRole = accessTokenPayload.role;

        if (userRole === userRoles.ADMIN) {
          // Refresh the page to re-check admin status
          await checkAdminStatus();
        } else {
          setLoginError('This account does not have admin privileges');
          await Session.signOut();
        }
      } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
        setLoginError('Invalid email or password');
      } else {
        setLoginError('An error occurred during login. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoggingIn(false);
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

  // Not authenticated - show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-3">
                <Lock className="w-8 h-8 text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Access Required</h1>
              <p className="text-sm text-gray-500">Please log in to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@knacksters.co"
                    required
                    disabled={isLoggingIn}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoggingIn}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoggingIn}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{loginError}</p>
                </div>
              )}

              {/* Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full px-6 py-3.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800 transition-colors font-semibold text-base shadow-md hover:shadow-lg disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoggingIn ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </div>
            </form>

            {/* Helper Text */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
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
