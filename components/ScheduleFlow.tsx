'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, ExternalLink, CheckCircle, Clock, Video } from 'lucide-react';
import KnackstersButton from '@/components/svg/knacksters-button';
import KnackstersOutlineButton from '@/components/svg/knacksters-outline-button';

interface BookingDetails {
  bookingId: string;
  meetingLink: string | null;
  startTime: string;
  endTime: string;
  attendeeName: string | null;
  timezone: string | null;
  status: string;
}

export default function ScheduleFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isClientFlow, setIsClientFlow] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load profile ID from sessionStorage (for talent flow)
    if (typeof window !== 'undefined') {
      const id = sessionStorage.getItem('talentProfileId');
      
      if (id) {
        // This is a talent interview flow
        setProfileId(id);
        setIsClientFlow(false);
      } else {
        // This is a client onboarding flow (coming from signup)
        setIsClientFlow(true);
      }

      // Check if user was redirected back from Cal.com
      const bookingConfirmed = searchParams.get('bookingConfirmed');
      if (bookingConfirmed === 'true') {
        // Mark as completed immediately (webhooks will update DB in background)
        setBookingCompleted(true);
        // Try to fetch booking details if webhook already processed
        if (id) {
          fetchBookingDetails(id);
        }
      }
    }
  }, [router, searchParams]);

  const fetchBookingDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/booking/${id}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setBookingDetails(data.data);
      } else {
        // Booking not in DB yet (webhook hasn't fired or no webhook configured)
        // This is fine - user can still complete the flow
        console.log('Booking details not available yet');
      }
    } catch (error) {
      // Silent fail - booking details are optional
      console.error('Failed to fetch booking details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCalendar = () => {
    // Use client or talent URL based on flow type
    const calUrl = isClientFlow 
      ? process.env.NEXT_PUBLIC_CAL_CLIENT_URL 
      : process.env.NEXT_PUBLIC_CAL_TALENT_URL;
    
    if (calUrl) {
      // Open Cal.com booking page
      window.open(calUrl, '_blank', 'noopener,noreferrer');
      // Mark as completed after opening
      setTimeout(() => {
        setBookingCompleted(true);
      }, 1000);
    } else {
      alert('Calendar booking URL not configured. Please contact support.');
    }
  };

  const handleComplete = () => {
    // Clear session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('talentProfileId');
    }
    
    // Redirect based on flow type
    if (isClientFlow) {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  const handleBack = () => {
    if (isClientFlow) {
      router.push('/signup');
    } else {
      router.push('/talent-network');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center" style={{ gap: '14px' }}>
            <Image 
              src="/logo.svg" 
              alt="Knacksters Logo" 
              width={40} 
              height={40}
              className="w-10 h-10"
              priority
            />
            <h1 
              className="text-gray-900"
              style={{ 
                fontFamily: 'var(--font-public-sans), sans-serif',
                fontWeight: 600,
                fontSize: '29.79px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              Knacksters
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Courier New, monospace' }}>
              Schedule
            </h2>
            <h3 className="text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Courier New, monospace' }}>
              {isClientFlow ? 'Your Onboarding Call' : 'Your Meet & Greet'}
            </h3>
            <p className="text-gray-600 text-base">
              {isClientFlow 
                ? "Let's discuss your needs and how Knacksters can help you achieve your goals"
                : "Let's have a casual conversation to learn more about your expertise and discuss potential opportunities"
              }
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-semibold">
              1
            </div>
            <div className="w-16 h-0.5 bg-gray-900"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-semibold">
              2
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 font-semibold">
              3
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Calendar Icon & Instructions */}
            <div className="flex items-start gap-4 mb-8 p-6 bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 rounded-xl">
              <Calendar className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {isClientFlow ? 'Schedule Your Onboarding Call' : 'Schedule Your Interview'}
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Click the button below to open our booking calendar. You'll be able to:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Choose from available time slots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Receive instant calendar invite with video link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Get email reminders before the meeting</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cal.com Booking Button */}
            <div className="mb-8">
              <button
                onClick={handleOpenCalendar}
                style={{
                  width: '100%',
                  padding: '24px 32px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '18px',
                  boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(249, 115, 22, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(249, 115, 22, 0.3)';
                }}
              >
                <Calendar className="w-6 h-6" />
                <span>Open Booking Calendar</span>
                <ExternalLink className="w-5 h-5" />
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Opens in a new window • Book your preferred time slot
              </p>
            </div>

            {/* Booking Completed - Show Details or Generic Confirmation */}
            {bookingCompleted && (bookingDetails ? (
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-bold text-green-900">
                      {isClientFlow ? 'Onboarding Call Scheduled! ✅' : 'Interview Scheduled! ✅'}
                    </p>
                    <p className="text-sm text-green-700 mt-1">Your calendar invite has been sent.</p>
                  </div>
                </div>
                
                {/* Booking Details */}
                <div className="mt-4 space-y-3 bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(bookingDetails.startTime).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZoneName: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-semibold text-gray-900">30 minutes</p>
                    </div>
                  </div>
                  
                  {bookingDetails.meetingLink && (
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-500">Meeting Link</p>
                        <a
                          href={bookingDetails.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
                        >
                          Join Video Call
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-600 mt-4 text-center">
                  A confirmation email has been sent to your inbox with all the details.
                </p>
              </div>
            ) : (
              /* Generic confirmation when webhook data not available */
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-bold text-green-900">
                      {isClientFlow ? 'Onboarding Call Scheduled! ✅' : 'Interview Scheduled! ✅'}
                    </p>
                    <p className="text-sm text-green-700 mt-1">Your booking is confirmed.</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700 mb-2">
                    You should have received a calendar invite with:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Meeting date and time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Video conference link</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Email reminders before the meeting</span>
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-gray-600 mt-4 text-center">
                  Check your email for the calendar invite with all meeting details.
                </p>
              </div>
            ))}

            {/* Loading State */}
            {loading && !bookingCompleted && (
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-sm text-blue-700">Confirming your booking...</p>
              </div>
            )}

            {/* What to Expect Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-base font-bold text-gray-900 mb-4">
                {isClientFlow ? 'What to Expect in Your Onboarding Call' : 'What to Expect in Your Interview'}
              </h4>
              <div className="space-y-3">
                {(isClientFlow ? [
                  'Understanding your business needs and project requirements',
                  'Discussion of available talent and service offerings',
                  'Exploration of pricing plans and subscription options',
                  'Overview of how Knacksters can help you achieve your goals'
                ] : [
                  'Discussion of your professional background and areas of expertise',
                  'Exploration of projects and opportunities that match your interests',
                  'Understanding your availability and preferred work arrangements',
                  'Overview of how you can make Knacksters Rock'
                ]).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm pt-0.5">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {/* Back Button */}
              <div className="flex-1">
                <KnackstersOutlineButton
                  text="Back"
                  fullWidth={true}
                  onClick={handleBack}
                />
              </div>
              {/* Complete Button */}
              <div className="flex-1">
                <KnackstersButton
                  text="Complete"
                  fullWidth={true}
                  onClick={handleComplete}
                  disabled={!bookingCompleted}
                />
              </div>
            </div>

            {!bookingCompleted && (
              <p className="text-xs text-gray-500 text-center mt-4">
                {isClientFlow 
                  ? 'After booking your meeting, click "Complete" to access your dashboard'
                  : 'After booking your meeting, click "Complete" to finish your application'
                }
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-sm">
          <p>
            This site is protected by{' '}
            <a href="#" className="underline hover:text-gray-300">
              Privacy Policy
            </a>
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-300">Terms and Conditions</a>
            <a href="#" className="hover:text-gray-300">Privacy policy</a>
            <a href="#" className="hover:text-gray-300">CA Privacy Notice</a>
          </div>
        </div>
      </div>
    </div>
  );
}
