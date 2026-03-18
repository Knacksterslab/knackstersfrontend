'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, CheckCircle, Clock, Video, AlertCircle } from 'lucide-react';
import KnackstersButton from '@/components/svg/knacksters-button';
import KnackstersOutlineButton from '@/components/svg/knacksters-outline-button';
import { useUser } from '@/contexts/UserContext';

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

interface ScheduleFlowProps {
  flowType: 'client' | 'talent';
}

export default function ScheduleFlow({ flowType }: ScheduleFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isClientFlow, setIsClientFlow] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(2);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [prefillName, setPrefillName] = useState('');
  const [prefillEmail, setPrefillEmail] = useState('');

  // For client flow, pre-fill from the logged-in user's session
  useEffect(() => {
    if (flowType === 'client' && user) {
      setPrefillName(user.fullName || '');
      setPrefillEmail(user.email || '');
    }
  }, [flowType, user]);

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
        console.log('🎉 Booking successful!', {
          data,
          currentOrigin: window.location.origin,
          currentHref: window.location.href
        });
        
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
    // Set flow based on explicit prop instead of sessionStorage
    setIsClientFlow(flowType === 'client');
    
    if (flowType === 'talent' && typeof window !== 'undefined') {
      const id = sessionStorage.getItem('talentProfileId');
      if (id) setProfileId(id);

      // Pre-fill the Cal.com form with the talent's own details
      const name = sessionStorage.getItem('talentName') || '';
      const email = sessionStorage.getItem('talentEmail') || '';
      setPrefillName(name);
      setPrefillEmail(email);
    }

    // Check for booking success from URL parameters (Cal.com redirects here after booking)
    // This runs for BOTH client and talent flows
    if (typeof window !== 'undefined') {
      const bookingConfirmed = searchParams.get('bookingConfirmed');
      const isSuccessBookingPage = searchParams.get('isSuccessBookingPage');
      const uid = searchParams.get('uid');
      const attendeeName = searchParams.get('attendeeName');
      const startTime = searchParams.get('startTime');
      const endTime = searchParams.get('endTime');

      console.log('🔍 Checking URL params on load:', {
        currentUrl: window.location.href,
        currentOrigin: window.location.origin,
        bookingConfirmed,
        isSuccessBookingPage,
        uid: uid ? 'present' : 'missing',
        hasBookingParams: (bookingConfirmed === 'true' || isSuccessBookingPage === 'true') && !!uid
      });

      // Cal.com can send either bookingConfirmed=true OR isSuccessBookingPage=true
      const isBookingSuccess = (bookingConfirmed === 'true' || isSuccessBookingPage === 'true') && uid;
      
      if (isBookingSuccess) {
        
        setBookingCompleted(true);
        
        const title = searchParams.get('title');
        const description = searchParams.get('description');
        const location = searchParams.get('location');
        
        setBookingDetails({
          bookingId: uid,
          meetingLink: location || null,
          startTime: startTime || '',
          endTime: endTime || '',
          attendeeName: attendeeName || null,
          timezone: null,
          status: 'confirmed'
        });

        // Save booking to backend (only for client flow)
        if (flowType === 'client') {
          (async () => {
            try {
              const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
              const response = await fetch(`${API_URL}/api/client/meetings/calcom-booking`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  bookingId: uid,
                  scheduledAt: startTime,
                  endTime: endTime,
                  videoCallUrl: location,
                  title: title || 'Onboarding Call',
                  description: description || 'Client onboarding strategy call',
                }),
              });

              if (!response.ok) {
                const errBody = await response.text().catch(() => '');
                console.error('Failed to save booking to backend', response.status, errBody);
                setBookingError('Failed to save your booking. Please click "Complete" to try again.');
              } else {
                console.log('Booking saved successfully');
                setIsRedirecting(true);
              }
            } catch (error) {
              console.error('Error saving booking (network):', error);
              setBookingError('Failed to save your booking. Please click "Complete" to try again.');
            }
          })();
        }
      }
    }
  }, [flowType, searchParams]);

  // Fix localhost redirect in production
  // When Cal.com redirects to localhost with booking params, redirect back to production
  // This only runs in production when users are sent to localhost by mistake
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // ONLY redirect if:
    // 1. We're in production build (NODE_ENV === 'production')
    // 2. User landed on localhost hostname
    // 3. URL has booking parameters from Cal.com
    const nodeEnv = process.env.NODE_ENV;
    const isProduction = nodeEnv === 'production';
    const isLocalhost = window.location.hostname === 'localhost';
    const hasBookingParams = searchParams.get('bookingConfirmed') === 'true' || 
                             searchParams.get('isSuccessBookingPage') === 'true' || 
                             searchParams.get('uid');
    const shouldRedirect = isProduction && isLocalhost && hasBookingParams;
    
    console.log('🔄 Localhost redirect check:', {
      hostname: window.location.hostname,
      nodeEnv,
      isProduction,
      isLocalhost,
      hasBookingParams,
      shouldRedirect
    });
    
    if (shouldRedirect) {
      const productionOrigin = 'https://www.knacksters.co';
      const newUrl = window.location.href.replace(window.location.origin, productionOrigin);
      window.location.replace(newUrl);
    }
  }, [searchParams]);

  // Auto-redirect countdown for client flow
  useEffect(() => {
    if (!isRedirecting || flowType !== 'client') return;

    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown reached 0, redirect to dashboard
      router.push('/client-dashboard');
    }
  }, [isRedirecting, redirectCountdown, flowType, router]);

  const getCalLink = () => {
    // Use client or talent URL based on flow type
    const calUrl = flowType === 'client'
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
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('talentProfileId');
      sessionStorage.removeItem('talentName');
      sessionStorage.removeItem('talentEmail');
    }
    
    // Only redirect for client flow
    // For talent, the button is hidden after booking, but as a safety measure,
    // we don't navigate them anywhere if this is called
    if (flowType === 'client') {
      router.push('/client-dashboard');
    }
    // For talent: do nothing, stay on page
  };

  const handleBack = () => {
    if (flowType === 'client') {
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
                  console.log('🗓️ Opening Cal.com modal:', {
                    origin: window.location.origin,
                    flowType,
                    nodeEnv: process.env.NODE_ENV
                  });
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
            {bookingCompleted && (bookingDetails && bookingDetails.startTime ? (
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
                          {(() => {
                          const dateObj = new Date(bookingDetails.startTime);
                          const isValidDate = !isNaN(dateObj.getTime());
                          return isValidDate ? dateObj.toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            timeZoneName: 'short',
                          }) : 'Time confirmed — check your email for details';
                        })()}
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
                </div>

                <p className="text-sm text-gray-700 mt-4 text-center flex items-center justify-center gap-2">
                  <Video className="w-4 h-4 text-gray-600" />
                  Meeting link sent to your email
                </p>
                
                <p className="text-xs text-gray-500 mt-2 text-center">
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
              
              {/* Complete Button - Only show if booking failed OR for talent flow */}
              {(bookingError || (!isClientFlow && !bookingCompleted)) && (
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

            {/* Client auto-redirect message */}
            {isClientFlow && bookingCompleted && isRedirecting && !bookingError && (
              <div className="text-center mt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-green-700 mb-2">
                  Booking Confirmed! 🎉
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Redirecting to your dashboard in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...
                </p>
                <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div 
                    className="h-full bg-green-600 transition-all duration-1000 ease-linear"
                    style={{ width: `${((2 - redirectCountdown) / 2) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Client booking error message */}
            {isClientFlow && bookingCompleted && bookingError && (
              <div className="text-center mt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-lg font-semibold text-red-700 mb-2">
                  Booking Issue
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {bookingError}
                </p>
              </div>
            )}

            {/* Talent booking complete message */}
            {!isClientFlow && bookingCompleted && (
              <div className="text-center mt-6">
                <p className="text-lg font-semibold text-green-700 mb-2">
                  You're all set! ✨
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  We'll send you a reminder before your interview. While you wait, follow us on socials for updates and opportunities!
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a
                    href="https://twitter.com/knackstersco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.836L2.25 2.25h6.988l4.26 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Follow on X
                  </a>
                  <a
                    href="https://www.youtube.com/@KnackstersLab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                  <a
                    href="https://www.linkedin.com/company/knacksters"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            )}

            {/* Client booking incomplete message */}
            {isClientFlow && !bookingCompleted && (
              <p className="text-xs text-gray-500 text-center mt-4">
                After booking your meeting, you'll be automatically redirected to your dashboard
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
        <div className="max-w-4xl mx-auto px-6 flex justify-end items-center text-sm gap-8">
          <Link href="/terms" className="hover:text-gray-300">Terms and Conditions</Link>
          <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
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
              {typeof window !== 'undefined' && (
                <iframe
                  src={(() => {
                    const redirectUrl = `${window.location.origin}/schedule/${flowType}`;
                    const calLink = getCalLink();
                    const params = new URLSearchParams({
                      embed: 'true',
                      theme: 'light',
                      layout: 'month_view',
                      name: prefillName,
                      email: prefillEmail,
                      redirectUrl,
                    });
                    return `https://cal.com/${calLink}?${params.toString()}`;
                  })()}
                  className="w-full h-full border-0"
                />
              )}
              {typeof window === 'undefined' && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
