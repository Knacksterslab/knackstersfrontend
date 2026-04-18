'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, CheckCircle } from 'lucide-react';
import KnackstersOutlineButton from '@/components/svg/knacksters-outline-button';
import { useUser } from '@/contexts/UserContext';
import { API_URL } from '@/lib/config/env';

// TypeScript declarations for Cal.com embed
declare global {
  interface Window {
    Cal?: { (command: string, ...args: any[]): void; q?: any[] };
    __calScriptLoaded?: boolean;
  }
}

interface ScheduleFlowProps {
  flowType: 'client' | 'talent';
}

const REDIRECT_SECONDS = 3;

export default function ScheduleFlow({ flowType }: ScheduleFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  const isClientFlow = flowType === 'client';

  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [prefillName, setPrefillName] = useState('');
  const [prefillEmail, setPrefillEmail] = useState('');
  // Saving state shown on the success screen while the backend call is in-flight
  const [isSaving, setIsSaving] = useState(false);

  // ─── Pre-fill Cal.com form ────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isClientFlow) {
      const name = sessionStorage.getItem('clientName') || user?.fullName || '';
      const email = sessionStorage.getItem('clientEmail') || user?.email || '';
      setPrefillName(name);
      setPrefillEmail(email);
    } else {
      setPrefillName(sessionStorage.getItem('talentName') || '');
      setPrefillEmail(sessionStorage.getItem('talentEmail') || '');
    }
  }, [isClientFlow, user]);

  // ─── Load Cal.com embed.js once ──────────────────────────────────────────

  useEffect(() => {
    if (typeof window === 'undefined' || window.__calScriptLoaded) return;
    if (document.querySelector('script[src*="cal.com/embed"]')) {
      window.__calScriptLoaded = true;
      return;
    }
    window.__calScriptLoaded = true;

    (function (C: any, A: string, L: string) {
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) { (C.Cal.q = C.Cal.q || []).push(args); };
      C.Cal.q = C.Cal.q || [];
      const t = d.createElement(A);
      t.async = 1;
      t.src = L;
      t.onerror = () => { window.__calScriptLoaded = false; };
      t.onload = () => {
        setTimeout(() => {
          try { window.Cal?.('init', { origin: 'https://app.cal.com' }); } catch { /* non-fatal */ }
        }, 100);
      };
      d.getElementsByTagName(A)[0].parentNode.insertBefore(t, d.getElementsByTagName(A)[0]);
    })(window, 'script', 'https://app.cal.com/embed/embed.js');
  }, []);

  // ─── Save booking to backend (primary path for client flow) ─────────────
  // This fires immediately after Cal.com confirms the booking, before the redirect.
  // It works in dev (no webhook tunnel needed) and eliminates the race condition
  // in prod where the webhook might arrive after the dashboard has already loaded.
  // The backend deduplicates: if the webhook already saved it, this is a no-op.

  const saveClientBooking = async (params: {
    uid: string; startTime: string; endTime: string;
    location: string | null; title: string | null; description: string | null;
  }) => {
    if (!isClientFlow) return;
    try {
      setIsSaving(true);
      await fetch(`${API_URL}/api/client/meetings/calcom-booking`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: params.uid,
          scheduledAt: params.startTime,
          endTime: params.endTime,
          videoCallUrl: params.location,
          title: params.title || 'Onboarding Call',
          description: params.description || '',
        }),
      });
    } catch {
      // Non-fatal — webhook will save it on the backend side
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Listen for Cal.com bookingSuccessful postMessage ────────────────────

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://cal.com' && event.origin !== 'https://app.cal.com') return;
      if (event.data?.type === 'bookingSuccessful') {
        setShowCalModal(false);
        clearSessionStorage();
        const d = event.data.data ?? {};
        // Cal.com wraps booking fields under d.booking (confirmed via runtime log)
        const bk = d.booking ?? d;
        saveClientBooking({
          uid: bk.uid || String(bk.id || ''),
          startTime: bk.startTime || d.date || '',
          endTime: bk.endTime || '',
          location: bk.videoCallUrl
            || (bk.references as any[])?.find((r: any) => r.type === 'daily_video')?.meetingUrl
            || null,
          title: bk.title || d.eventType?.title || null,
          description: bk.description || null,
        }).finally(() => setBookingCompleted(true));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClientFlow]);

  // ─── Fallback: detect booking via URL params (Cal.com redirect into parent) ─

  useEffect(() => {
    const uid = searchParams.get('uid');
    const isSuccess =
      (searchParams.get('bookingConfirmed') === 'true' ||
        searchParams.get('isSuccessBookingPage') === 'true') &&
      !!uid;

    if (isSuccess) {
      clearSessionStorage();
      saveClientBooking({
        uid: uid!,
        startTime: searchParams.get('startTime') || '',
        endTime: searchParams.get('endTime') || '',
        location: searchParams.get('location') || null,
        title: searchParams.get('title') || null,
        description: searchParams.get('description') || null,
      }).finally(() => setBookingCompleted(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ─── Auto-redirect countdown (client flow only) ───────────────────────────
  // isSaving holds the redirect until the backend call completes.

  useEffect(() => {
    if (!bookingCompleted || !isClientFlow || isSaving) return;
    if (countdown <= 0) {
      router.push('/client-dashboard');
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [bookingCompleted, isClientFlow, isSaving, countdown, router]);

  // ─── Helpers ─────────────────────────────────────────────────────────────

  function clearSessionStorage() {
    if (typeof window === 'undefined') return;
    ['clientName', 'clientEmail', 'talentName', 'talentEmail', 'talentProfileId'].forEach(
      k => sessionStorage.removeItem(k),
    );
  }

  function getCalLink(): string {
    const calUrl = isClientFlow
      ? process.env.NEXT_PUBLIC_CAL_CLIENT_URL
      : process.env.NEXT_PUBLIC_CAL_TALENT_URL;
    if (!calUrl) return '';
    return calUrl
      .replace('https://cal.com/', '')
      .replace('https://app.cal.com/', '')
      .replace(/^\/+/, '');
  }

  // ─── Full-page success screen ─────────────────────────────────────────────

  if (bookingCompleted) {
    if (isClientFlow) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
          <Image src="/logo.svg" alt="Knacksters" width={48} height={48} className="mb-8" priority />

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">You're all set! 🎉</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Your onboarding call is booked. A calendar invite with the video link
              has been sent to your email.
            </p>

            {/* Countdown / saving state */}
            {isSaving ? (
              <p className="text-sm text-gray-400 mb-11 flex items-center justify-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                Saving your booking…
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-3">
                  Taking you to your dashboard in{' '}
                  <span className="font-semibold text-gray-700">{countdown}</span>
                  {countdown === 1 ? ' second' : ' seconds'}…
                </p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((REDIRECT_SECONDS - countdown) / REDIRECT_SECONDS) * 100}%` }}
                  />
                </div>
              </>
            )}

            <button
              onClick={() => router.push('/client-dashboard')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Go to Dashboard →
            </button>
          </div>

          <div className="mt-8 flex gap-8 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-gray-600">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
          </div>
        </div>
      );
    }

    // Talent success screen
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <Image src="/logo.svg" alt="Knacksters" width={48} height={48} className="mb-8" priority />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're all set! ✨</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Your interview is booked. We'll send a reminder before the call.
            While you wait, follow us for updates and opportunities!
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="https://twitter.com/knackstersco" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.836L2.25 2.25h6.988l4.26 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow on X
            </a>
            <a href="https://www.youtube.com/@KnackstersLab" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
            <a href="https://www.linkedin.com/company/knacksters" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 flex gap-8 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-gray-600">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
        </div>
      </div>
    );
  }

  // ─── Booking page ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-3">
          <Image src="/logo.svg" alt="Knacksters Logo" width={40} height={40} priority />
          <span className="text-gray-900 font-semibold text-2xl" style={{ fontFamily: 'var(--font-public-sans), sans-serif' }}>
            Knacksters
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Courier New, monospace' }}>
              {isClientFlow ? 'Book Your Onboarding Call' : 'Book Your Meet & Greet'}
            </h2>
            <p className="text-gray-500 text-sm mt-4">
              {isClientFlow
                ? "A quick 15-minute call to understand your needs and set you up for success."
                : "A casual 30-minute conversation about your expertise and how we work."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* What you'll get */}
            <div className="flex items-start gap-4 mb-8 p-5 bg-orange-50 border border-orange-100 rounded-xl">
              <Calendar className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <ul className="text-sm text-gray-700 space-y-1.5">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> Pick a time that works for you</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> Instant calendar invite with video link</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> Email reminders before the call</li>
              </ul>
            </div>

            {/* Open calendar button */}
            <button
              onClick={() => setShowCalModal(true)}
              className="w-full py-5 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 8px 20px -4px rgba(249,115,22,0.35)' }}
            >
              <Calendar className="w-5 h-5" />
              Open Booking Calendar
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">Opens as a popup · Select your preferred time slot</p>

            {/* Back link */}
            <div className="mt-8 flex justify-center">
              <KnackstersOutlineButton
                text="Back"
                onClick={() => router.push(isClientFlow ? '/signup' : '/talent-network')}
              />
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              After booking you'll {isClientFlow ? 'be taken to your dashboard' : 'see your confirmation'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-5">
        <div className="max-w-4xl mx-auto px-6 flex justify-end gap-8 text-sm">
          <Link href="/terms" className="hover:text-gray-300">Terms and Conditions</Link>
          <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
        </div>
      </div>

      {/* Cal.com modal */}
      {showCalModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCalModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                {isClientFlow ? 'Schedule Your Onboarding Call' : 'Schedule Your Interview'}
              </h2>
              <button onClick={() => setShowCalModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {typeof window !== 'undefined' ? (
                <iframe
                  src={(() => {
                    const params = new URLSearchParams({
                      embed: 'true',
                      theme: 'light',
                      layout: 'month_view',
                      name: prefillName,
                      email: prefillEmail,
                      redirectUrl: `${window.location.origin}/schedule/${flowType}`,
                    });
                    return `https://cal.com/${getCalLink()}?${params.toString()}`;
                  })()}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
