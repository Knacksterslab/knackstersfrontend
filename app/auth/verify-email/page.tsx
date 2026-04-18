'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import EmailVerification from 'supertokens-auth-react/recipe/emailverification';
import AuthLayout from '@/components/auth/AuthLayout';

type ViewState = 'checking' | 'pending' | 'verifying' | 'success' | 'invalid_token' | 'error';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRun = useRef(false);

  const [view, setView] = useState<ViewState>('checking');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Tick down the resend cooldown every second
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get('token');

    if (!token) {
      // No token — user just signed up. Email was already sent from SignUpPage.
      // Nothing to do here; resend button handles explicit re-requests.
      setView('pending');
      return;
    }

    // Token present — consume it
    setView('verifying');

    (async () => {
      try {
        const response = await EmailVerification.verifyEmail();

        if (response.status === 'OK') {
          setView('success');
          // Give the backend a moment to run post-verification side effects,
          // then redirect to the schedule page as the first step of onboarding.
          setTimeout(() => router.replace('/schedule/client'), 2000);
        } else if (response.status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR') {
          setView('invalid_token');
        } else {
          setView('error');
        }
      } catch {
        setView('error');
      }
    })();
  }, [searchParams, router]);

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    try {
      await EmailVerification.sendVerificationEmail();
      setResendSuccess(true);
      setResendCooldown(60);
    } catch {
      // Silently fail — user can try again
    } finally {
      setResendLoading(false);
    }
  };

  // ─── Views ───────────────────────────────────────────────────────────────────

  if (view === 'checking') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto" />
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (view === 'verifying') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Verifying your email…</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (view === 'success') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Email verified!</h1>
            <p className="text-gray-500 text-sm">
              Taking you to schedule your onboarding call…
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (view === 'invalid_token') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Link expired or invalid</h1>
            <p className="text-gray-500 text-sm mb-8">
              This verification link has already been used or has expired (links are valid for 24 hours).
            </p>
            <button
              onClick={handleResend}
              disabled={resendLoading || resendCooldown > 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : resendLoading
                ? 'Sending…'
                : 'Send a new verification link'}
            </button>
            {resendSuccess && (
              <p className="text-sm text-green-600 mt-3">New link sent — check your inbox.</p>
            )}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#FF9634] hover:text-[#E9414C] font-medium mt-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to log in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (view === 'error') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
            <p className="text-gray-500 text-sm mb-8">
              We couldn't verify your email. Please try again or request a new link.
            </p>
            <button
              onClick={handleResend}
              disabled={resendLoading || resendCooldown > 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : resendLoading
                ? 'Sending…'
                : 'Resend verification email'}
            </button>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#FF9634] hover:text-[#E9414C] font-medium mt-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to log in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Default — 'pending': user just signed up, waiting for them to click the link
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#FF9634]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your inbox</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            We sent a verification link to your email address. Click the link to activate your account.
            <br /><br />
            <span className="text-gray-400 text-xs">
              The link expires in 24 hours. Check your spam folder if you don't see it.
            </span>
          </p>

          {/* Resend button */}
          <button
            onClick={handleResend}
            disabled={resendLoading || resendCooldown > 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : resendLoading
              ? 'Sending…'
              : 'Resend verification email'}
          </button>

          {resendSuccess && (
            <p className="text-sm text-green-600 mt-3">
              New link sent — check your inbox.
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto" />
          </div>
        </div>
      </AuthLayout>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
