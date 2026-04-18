'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { meetingsApi } from '@/lib/api/client';

export interface BookingDetails {
  bookingId: string;
  meetingLink: string | null;
  startTime: string;
  endTime: string;
  attendeeName: string | null;
  timezone: string | null;
  status: 'confirmed';
}

interface CalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calUrl: string;
  title: string;
  /** 'book' creates a new meeting; 'reschedule' updates an existing one */
  mode: 'book' | 'reschedule';
  /** Cal.com booking UID — required for reschedule so Cal shows the correct event */
  existingBookingUid?: string;
  /** Our DB meeting ID — required for reschedule so we can update the backend record */
  meetingId?: string;
  onBookingComplete: (details: BookingDetails) => void;
  prefillName?: string;
  prefillEmail?: string;
}

export default function CalBookingModal({
  isOpen,
  onClose,
  calUrl,
  title,
  mode,
  existingBookingUid,
  meetingId,
  onBookingComplete,
  prefillName = '',
  prefillEmail = '',
}: CalBookingModalProps) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  // Reset state every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setSaving(false);
      setSaveError(null);
      setConfirmed(false);
    }
  }, [isOpen]);

  // Listen for booking success events from Cal.com iframe.
  // Gated by isOpen to prevent double-saves when multiple CalBookingModal
  // instances exist on the same page but only one is visible.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = async (event: MessageEvent) => {
      if (!isOpen) return;
      if (event.origin !== 'https://cal.com' && event.origin !== 'https://app.cal.com') return;

      const data = event.data;
      if (data?.type !== 'bookingSuccessful' && data?.type !== 'rescheduleBookingSuccessful') return;

      // #region agent log
      fetch('http://127.0.0.1:7529/ingest/4f423655-0235-4d51-bfe9-13de49008459',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'72358f'},body:JSON.stringify({sessionId:'72358f',runId:'post-fix',location:'CalBookingModal.tsx:69',message:'bookingSuccessful postMessage received',data:{isOpen,bookingUid:data?.data?.booking?.uid,bookingStartTime:data?.data?.booking?.startTime},timestamp:Date.now(),hypothesisId:'H-A'})}).catch(()=>{});
      // #endregion

      const raw = data.data ?? {};
      // Cal.com wraps booking fields under raw.booking (confirmed via runtime log)
      const booking = raw.booking ?? raw;
      const details: BookingDetails = {
        bookingId: booking.uid || String(booking.id || ''),
        meetingLink: booking.videoCallUrl
          || (booking.references as any[])?.find((r: any) => r.type === 'daily_video')?.meetingUrl
          || null,
        startTime: booking.startTime || raw.date || '',
        endTime: booking.endTime || '',
        attendeeName: booking.attendees?.[0]?.name || null,
        timezone: booking.attendees?.[0]?.timeZone || null,
        status: 'confirmed',
      };

      // Show saving overlay immediately so the user never sees Cal.com's confirmation/login page
      setSaving(true);
      setSaveError(null);

      try {
        if (mode === 'book') {
          await meetingsApi.saveCalcomBooking({
            bookingId: details.bookingId,
            scheduledAt: details.startTime,
            endTime: details.endTime,
            videoCallUrl: details.meetingLink,
            title: booking.title || raw.eventType?.title || 'Strategy Call',
            description: booking.description || undefined,
          });
        } else if (mode === 'reschedule' && meetingId && details.startTime) {
          await meetingsApi.reschedule(meetingId, details.startTime);
        }

        setConfirmed(true);
        setSaving(false);

        // Give the user a moment to see the confirmation, then close & notify parent
        setTimeout(() => {
          onBookingComplete(details);
          onClose();
        }, 1500);
      } catch (err: any) {
        setSaving(false);
        setSaveError(err?.message || 'Failed to save your booking. Please try again.');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen, mode, meetingId, onBookingComplete, onClose]);

  if (!isOpen) return null;

  // Extract the Cal.com slug from full URL
  const getCalLink = () => {
    if (!calUrl) return '';
    return calUrl
      .replace('https://cal.com/', '')
      .replace('https://app.cal.com/', '')
      .replace(/^\/+/, '');
  };

  const getIframeUrl = () => {
    const baseUrl = `https://cal.com/${getCalLink()}`;
    const params = new URLSearchParams({ embed: 'true', theme: 'light' });

    if (mode === 'reschedule' && existingBookingUid) {
      params.append('rescheduleUid', existingBookingUid);
    } else {
      params.append('layout', 'month_view');
      if (prefillName) params.append('name', prefillName);
      if (prefillEmail) params.append('email', prefillEmail);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={!saving && !confirmed ? onClose : undefined}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {!saving && !confirmed && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden relative">
          {/* Cal.com iframe — always rendered so booking flow isn't interrupted */}
          <iframe
            src={getIframeUrl()}
            className="w-full h-full border-0"
            title={title}
          />

          {/* Overlay: shown while saving or after confirmation — prevents Cal.com
              confirmation/login page from ever being visible to the user */}
          {(saving || confirmed || saveError) && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-4 z-10">
              {saving && !confirmed && !saveError && (
                <>
                  <Loader2 size={40} className="animate-spin text-[#FF9634]" />
                  <p className="text-base font-semibold text-gray-900">Confirming your booking…</p>
                  <p className="text-sm text-gray-500">Just a moment while we save your meeting.</p>
                </>
              )}

              {confirmed && (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={36} className="text-green-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {mode === 'reschedule' ? 'Meeting Rescheduled!' : 'Meeting Booked!'}
                  </p>
                  <p className="text-sm text-gray-500">A calendar invite has been sent to your email.</p>
                </>
              )}

              {saveError && (
                <div className="text-center max-w-sm px-4">
                  <p className="text-base font-semibold text-red-700 mb-2">Something went wrong</p>
                  <p className="text-sm text-gray-600 mb-4">{saveError}</p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
