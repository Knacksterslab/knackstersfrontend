'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, CheckCircle, Clock, Video } from 'lucide-react';
import KnackstersButton from '@/components/svg/knacksters-button';
import KnackstersOutlineButton from '@/components/svg/knacksters-outline-button';

// TypeScript declarations for Cal.com
declare global {
  interface Window {
    Cal?: {
      (command: string, ...args: any[]): void;
      q?: any[];
    };
    __calScriptLoaded?: boolean;
  }
}

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
  const [showCalModal, setShowCalModal] = useState(false);

  // #region agent log - Component mount
  useEffect(() => {
    console.log('🔍 [ScheduleFlow] Component mounted', {
      hostname: window.location.hostname,
      href: window.location.href,
      hasLocalhost: window.location.href.includes('localhost:3000'),
      hasBookingParams: window.location.href.includes('bookingConfirmed=true')
    });
  }, []);
  // #endregion

  // Load Cal.com embed script ONCE using Cal.com's official method
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Use global flag to prevent multiple loads
    if (window.__calScriptLoaded) {
      return;
    }

    // Check if already loaded in DOM
    if (document.querySelector('script[src*="cal.com/embed"]')) {
      window.__calScriptLoaded = true;
      return;
    }

    // Mark as loading
    window.__calScriptLoaded = true;
    
    // Use Cal.com's official embed snippet (IIFE) to prevent "Cal is not defined" error
    (function (C: any, A: string, L: string) {
      let d = C.document;
      
      // Pre-initialize Cal namespace with queue
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        if (!cal.q) {
          cal.q = [];
        }
        cal.q.push(arguments);
      };
      C.Cal.q = C.Cal.q || [];
      
      // Create and load script
      let t = d.createElement(A);
      let s = d.getElementsByTagName(A)[0];
      t.async = 1;
      t.src = L;
      
      t.onload = () => {
        console.log('✅ Cal.com embed loaded');
        
        // Initialize Cal.com explicitly after script loads
        setTimeout(() => {
          if (window.Cal) {
            try {
              window.Cal('init', { origin: 'https://app.cal.com' });
              console.log('✅ Cal.com initialized');
            } catch (error: any) {
              console.error('Cal.com init error:', error);
            }
          }
        }, 100);
      };
      
      t.onerror = () => {
        console.error('❌ Failed to load Cal.com');
        window.__calScriptLoaded = false;
      };
      
      s.parentNode.insertBefore(t, s);
    })(window, 'script', 'https://app.cal.com/embed/embed.js');
  }, []);

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
        console.log('🎉 Booking successful!', data);
        
        setBookingCompleted(true);
        setShowCalModal(false);
        
        // Extract booking details if available
        if (data.data) {
          setBookingDetails({
            bookingId: data.data.uid || data.data.id || '',
            meetingLink: data.data.metadata?.videoCallUrl || null,
            startTime: data.data.startTime || '',
            endTime: data.data.endTime || '',
            attendeeName: data.data.attendees?.[0]?.name || null,
            timezone: data.data.timeZone || null,
            status: 'confirmed'
          });
        }
      }
    };

    // Listen for postMessage events from Cal.com iframe
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    // #region agent log - URL parsing useEffect
    console.log('🔍 [ScheduleFlow] URL parsing useEffect', {
      href: window.location.href,
      bookingConfirmed: searchParams.get('bookingConfirmed'),
      uid: searchParams.get('uid')
    });
    // #endregion
    
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

      // Check for booking success from URL parameters (Cal.com redirects here after booking)
      const bookingConfirmed = searchParams.get('bookingConfirmed');
      const uid = searchParams.get('uid');
      const attendeeName = searchParams.get('attendeeName');
      const startTime = searchParams.get('startTime');
      const endTime = searchParams.get('endTime');

      if (bookingConfirmed === 'true' && uid) {
        setBookingCompleted(true);
        setBookingDetails({
          bookingId: uid,
          meetingLink: null, // Not provided in URL params
          startTime: startTime || '',
          endTime: endTime || '',
          attendeeName: attendeeName || null,
          timezone: null,
          status: 'confirmed'
        });
      }
    }
  }, [router, searchParams]);

  // Fix localhost redirect in production
  // This handles the case where Cal.com event type is configured with localhost redirect URL
  useEffect(() => {
    // #region agent log - Redirect useEffect entry
    console.log('🔍 [ScheduleFlow] Redirect useEffect running', {
      hostname: window.location.hostname,
      href: window.location.href,
      hasLocalhostInUrl: window.location.href.includes('localhost:3000'),
      hostnameNotLocalhost: window.location.hostname !== 'localhost'
    });
    // #endregion
    
    if (typeof window !== 'undefined' && 
        window.location.hostname !== 'localhost' && 
        window.location.href.includes('localhost:3000')) {
      // #region agent log - Before redirect
      const newUrl = window.location.href.replace('http://localhost:3000', 'https://www.knacksters.co');
      console.log('✅ [ScheduleFlow] Redirect condition MATCHED - executing redirect', {
        oldUrl: window.location.href,
        newUrl: newUrl
      });
      // #endregion
      
      window.location.replace(newUrl);
      
      // #region agent log - After replace (should not reach here)
      console.log('❌ [ScheduleFlow] AFTER replace - this should not log');
      // #endregion
    } else {
      // #region agent log - Condition not matched
      console.log('❌ [ScheduleFlow] Redirect condition NOT matched', {
        hostname: window.location.hostname,
        isLocalhost: window.location.hostname === 'localhost',
        href: window.location.href,
        hasLocalhost3000: window.location.href.includes('localhost:3000'),
        reason: window.location.hostname === 'localhost' ? 'hostname IS localhost' : 'URL does not contain localhost:3000'
      });
      // #endregion
    }
  }, []);

  const getCalLink = () => {
    // Use client or talent URL based on flow type
    const calUrl = isClientFlow 
      ? process.env.NEXT_PUBLIC_CAL_CLIENT_URL 
      : process.env.NEXT_PUBLIC_CAL_TALENT_URL;
    
    if (!calUrl) {
      return '';
    }
    
    // Extract the Cal.com username/event-slug from the full URL
    // Expected format: https://cal.com/username/event-slug or https://app.cal.com/username/event-slug
    const result = calUrl
      .replace('https://cal.com/', '')
      .replace('https://app.cal.com/', '')
      .replace(/^\/+/, ''); // Remove leading slashes
    
    return result;
  };

  const handleComplete = () => {
    // Clear session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('talentProfileId');
    }
    
    // Only redirect for client flow
    // For talent, the button is hidden after booking, but as a safety measure,
    // we don't navigate them anywhere if this is called
    if (isClientFlow) {
      router.push('/client-dashboard');
    }
    // For talent: do nothing, stay on page
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
                  Click the button below to open our booking calendar in a popup. You'll be able to:
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
                onClick={(e) => {
                  e.preventDefault();
                  setShowCalModal(true);
                }}
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
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Opens as a popup • Select your preferred time slot
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
              {/* Back Button - Hide if booking completed */}
              {!bookingCompleted && (
                <div className="flex-1">
                  <KnackstersOutlineButton
                    text="Back"
                    fullWidth={true}
                    onClick={handleBack}
                  />
                </div>
              )}
              
              {/* Complete Button - Only show for clients OR if booking not completed */}
              {(isClientFlow || !bookingCompleted) && (
                <div className="flex-1">
                  <KnackstersButton
                    text="Complete"
                    fullWidth={true}
                    onClick={handleComplete}
                    disabled={!bookingCompleted}
                  />
                </div>
              )}
            </div>

            {/* Talent booking complete message */}
            {!isClientFlow && bookingCompleted && (
              <div className="text-center mt-6">
                <p className="text-lg font-semibold text-green-700 mb-2">
                  You're all set! ✨
                </p>
                <p className="text-sm text-gray-600">
                  We'll send you a reminder 24 hours before your interview.
                  Feel free to close this page.
                </p>
              </div>
            )}

            {/* Client booking incomplete message */}
            {isClientFlow && !bookingCompleted && (
              <p className="text-xs text-gray-500 text-center mt-4">
                After booking your meeting, click "Complete" to access your dashboard
              </p>
            )}

            {/* Talent booking incomplete message */}
            {!isClientFlow && !bookingCompleted && (
              <p className="text-xs text-gray-500 text-center mt-4">
                After booking your meeting, you'll see your confirmation details above
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

      {/* Custom Cal.com Modal */}
      {showCalModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowCalModal(false);
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {isClientFlow ? 'Schedule Your Onboarding Call' : 'Schedule Your Interview'}
              </h2>
              <button
                onClick={() => {
                  setShowCalModal(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body with iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`https://cal.com/${getCalLink()}?embed=true&theme=light&layout=month_view&name=&email=`}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
