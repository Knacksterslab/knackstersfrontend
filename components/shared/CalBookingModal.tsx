'use client';

import { useEffect } from 'react';

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
  mode: 'book' | 'reschedule';
  existingBookingUid?: string;
  onBookingComplete: (details: BookingDetails) => void;
}

export default function CalBookingModal({
  isOpen,
  onClose,
  calUrl,
  title,
  mode,
  existingBookingUid,
  onBookingComplete,
}: CalBookingModalProps) {
  // Listen for booking success events from Cal.com iframe
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      // Check if message is from Cal.com
      if (event.origin !== 'https://cal.com' && event.origin !== 'https://app.cal.com') {
        return;
      }

      const data = event.data;

      // Cal.com sends { type: 'bookingSuccessful', ... } on successful booking
      if (data?.type === 'bookingSuccessful') {
        // Extract booking details if available
        if (data.data) {
          const bookingDetails: BookingDetails = {
            bookingId: data.data.uid || data.data.id || '',
            meetingLink: data.data.metadata?.videoCallUrl || null,
            startTime: data.data.startTime || '',
            endTime: data.data.endTime || '',
            attendeeName: data.data.attendees?.[0]?.name || null,
            timezone: data.data.timeZone || null,
            status: 'confirmed',
          };
          onBookingComplete(bookingDetails);
        } else {
          // Fallback if no data
          onBookingComplete({
            bookingId: '',
            meetingLink: null,
            startTime: '',
            endTime: '',
            attendeeName: null,
            timezone: null,
            status: 'confirmed',
          });
        }
        onClose();
      }
    };

    // Listen for postMessage events from Cal.com iframe
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onBookingComplete, onClose]);

  if (!isOpen) return null;

  // Extract the Cal.com username/event-slug from the full URL
  const getCalLink = () => {
    if (!calUrl) return '';

    // Expected format: https://cal.com/username/event-slug or https://app.cal.com/username/event-slug
    return calUrl
      .replace('https://cal.com/', '')
      .replace('https://app.cal.com/', '')
      .replace(/^\/+/, ''); // Remove leading slashes
  };

  // Build iframe URL based on mode
  const getIframeUrl = () => {
    const baseUrl = `https://cal.com/${getCalLink()}`;
    const params = new URLSearchParams({
      embed: 'true',
      theme: 'light',
    });

    if (mode === 'reschedule' && existingBookingUid) {
      params.append('rescheduleUid', existingBookingUid);
    } else {
      params.append('layout', 'month_view');
      params.append('name', '');
      params.append('email', '');
    }

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body with iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={getIframeUrl()}
            className="w-full h-full border-0"
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
