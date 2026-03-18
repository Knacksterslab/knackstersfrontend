'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import AuthLayout from '@/components/auth/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await EmailPassword.sendPasswordResetEmail({
        formFields: [{ id: 'email', value: email }],
      });

      if (response.status === 'OK') {
        setSubmitted(true);
      } else if (response.status === 'FIELD_ERROR') {
        setError(response.formFields[0]?.error || 'Invalid email address');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
            <p className="text-gray-600 mb-2">
              If an account exists for <strong>{email}</strong>, we've sent a password reset link.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              The link expires in 1 hour. Check your spam folder if you don't see it.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#FF9634] hover:text-[#E9414C] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to log in
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot your password?</h1>
            <p className="text-sm text-gray-600">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9634] focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                  autoFocus
                  disabled={isLoading}
                />
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
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
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
