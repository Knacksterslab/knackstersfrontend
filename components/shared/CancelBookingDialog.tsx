'use client';

import { useState } from 'react';

interface CancelBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    startTime: string;
    bookingId: string;
  } | null;
  onConfirmCancel: () => Promise<void>;
}

export default function CancelBookingDialog({
  isOpen,
  onClose,
  bookingDetails,
  onConfirmCancel,
}: CancelBookingDialogProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !bookingDetails) return null;

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      });
    } catch {
      return isoString;
    }
  };

  const handleConfirm = async () => {
    setIsCancelling(true);
    setError(null);
    try {
      await onConfirmCancel();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to cancel meeting. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => { if (!isCancelling) onClose(); }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Cancel Meeting?</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to cancel this meeting?
            </p>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900">Scheduled for:</p>
              <p className="text-sm text-gray-700 mt-1">{formatDateTime(bookingDetails.startTime)}</p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> A cancellation notification will be sent to all participants.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isCancelling}
            className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Keep Meeting
          </button>
          <button
            onClick={handleConfirm}
            disabled={isCancelling}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCancelling ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Cancelling...
              </>
            ) : (
              'Cancel Meeting'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
