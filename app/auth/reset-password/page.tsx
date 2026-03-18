'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import AuthLayout from '@/components/auth/AuthLayout';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  // Detect whether we were linked from an admin invite vs. a standard reset
  const isInvite = searchParams.get('rid') === 'emailpassword' && !!searchParams.get('token');

  useEffect(() => {
    // If no token in URL at all, the link is invalid/expired
    if (!searchParams.get('token')) {
      setInvalidToken(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);

    try {
      // SuperTokens reads the token automatically from the URL
      const response = await EmailPassword.submitNewPassword({
        formFields: [{ id: 'password', value: password }],
      });

      if (response.status === 'OK') {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => router.push('/login'), 3000);
      } else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
        setInvalidToken(true);
      } else if (response.status === 'FIELD_ERROR') {
        setError(response.formFields[0]?.error || 'Invalid password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Token missing or already used
  if (invalidToken) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Link expired or invalid</h1>
            <p className="text-gray-600 mb-8">
              This password reset link has expired or already been used. Links are valid for 1 hour.
            </p>
            <div className="space-y-3">
              <Link
                href="/forgot-password"
                className="block w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-center"
              >
                Request a new link
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-[#FF9634] hover:text-[#E9414C] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Success state
  if (success) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {isInvite ? 'Password set!' : 'Password updated!'}
            </h1>
            <p className="text-gray-600 mb-8">
              {isInvite
                ? 'Your account is ready. Redirecting you to log in…'
                : 'Your password has been updated. Redirecting you to log in…'}
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#FF9634] hover:text-[#E9414C] font-medium transition-colors"
            >
              Go to log in now
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isInvite ? 'Set your password' : 'Reset your password'}
            </h1>
            <p className="text-sm text-gray-600">
              {isInvite
                ? 'Choose a password to activate your Knacksters account.'
                : 'Choose a new password for your account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {isInvite ? 'Password' : 'New Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent transition-all"
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent transition-all"
                  placeholder="Re-enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : isInvite ? (
                'Set Password & Get Started'
              ) : (
                'Update Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#FF9634] hover:text-[#E9414C] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
