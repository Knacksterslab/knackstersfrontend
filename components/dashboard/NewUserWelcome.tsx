'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Calendar, CheckCircle, CreditCard, Sparkles, Phone, Shield, Clock, Users } from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentMethodForm from './PaymentMethodForm'
import LogoSvg from '../svg/logo-svg'
import { getActivePartners } from '../partners/partner-config'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface NewUserWelcomeProps {
  user: {
    fullName?: string
    email: string
  }
  calendlyUrl?: string
  onScheduleCall?: () => void
}

type OnboardingStep = 'welcome' | 'payment' | 'schedule' | 'complete'

const pricingPlans = [
  {
    name: 'STARTER',
    price: '$12,500',
    priceValue: 12500,
    hours: '200 hours',
    description: 'Perfect for growing teams',
    features: ['200 hours per month', 'Dedicated account manager', 'Expert matching in 2-4 hours', '24/7 support'],
    popular: true,
  },
  {
    name: 'GROWTH',
    price: '$25,000',
    priceValue: 25000,
    hours: '450 hours',
    description: 'For scaling businesses',
    features: ['450 hours per month', 'Priority account manager', 'Expert matching in 1-2 hours', 'Quarterly strategy reviews'],
    popular: false,
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    priceValue: 0,
    hours: 'Unlimited',
    description: 'Tailored solutions',
    features: ['Custom hours allocation', 'Dedicated success team', 'Instant expert matching', 'Custom SLAs & contracts'],
    popular: false,
  },
]

const testimonialQuotes = [
  {
    quote: 'We staffed a full product team in days, not weeks.',
    name: 'Jordan Lee',
    title: 'VP Product',
  },
  {
    quote: 'The onboarding was seamless and the talent matched perfectly.',
    name: 'Amina Patel',
    title: 'COO',
  },
  {
    quote: 'We cut hiring overhead while accelerating delivery.',
    name: 'Chris Morgan',
    title: 'Head of Engineering',
  },
  {
    quote: 'High-quality specialists with clear, predictable costs.',
    name: 'Sofia Reyes',
    title: 'Founder',
  },
]

export default function NewUserWelcome({ user, calendlyUrl, onScheduleCall }: NewUserWelcomeProps) {
  const activePartners = getActivePartners()
  const testimonials = testimonialQuotes.map((item, index) => ({
    ...item,
    company: activePartners[index % activePartners.length]?.name || 'Knacksters Client',
  }))
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [paymentMethodAdded, setPaymentMethodAdded] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // Check if user already has payment method
  useEffect(() => {
    checkPaymentMethod()
  }, [])

  const checkPaymentMethod = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/client/stripe/payment-methods', {
        credentials: 'include',
      })
      const data = await response.json()
      if (data.success && data.paymentMethods && data.paymentMethods.length > 0) {
        setPaymentMethodAdded(true)
        setCurrentStep('schedule')
      }
    } catch (error) {
      console.error('Error checking payment method:', error)
    }
  }

  const createSetupIntent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/client/stripe/setup-intent', {
        method: 'POST',
        credentials: 'include',
      })
      const data = await response.json()
      if (data.success) {
        setClientSecret(data.clientSecret)
      }
    } catch (error) {
      console.error('Error creating setup intent:', error)
    }
  }

  const handlePaymentMethodSuccess = () => {
    setPaymentMethodAdded(true)
    setCurrentStep('schedule')
  }

  const handleStartOnboarding = async () => {
    await createSetupIntent()
    setCurrentStep('payment')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Logo Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <LogoSvg />
        </div>
      </div>

      {/* Header with gradient */}
      <div className="relative bg-white text-gray-900 py-12 px-4 sm:px-6 overflow-hidden border-b border-gray-200">
        <div className="relative max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-wide text-gray-500 text-center">
            Trusted by teams at
          </p>
          <div className="relative overflow-hidden mt-4">
            <div className="logo-track">
              {[...activePartners, ...activePartners].map((partner, index) => (
                <div
                  key={`${partner.id}-hero-${index}`}
                  className="mx-3 flex items-center justify-center px-6 py-3 rounded-full bg-gray-100 border border-gray-200 shadow-sm"
                  aria-hidden={index >= activePartners.length}
                >
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    width={110}
                    height={44}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 relative overflow-hidden">
            <div className="testimonial-track">
              {[...testimonials, ...testimonials].map((item, index) => (
                <div
                  key={`${item.name}-hero-${index}`}
                  className="min-w-[260px] sm:min-w-[320px] max-w-[360px] mx-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  aria-hidden={index >= testimonials.length}
                >
                  <p className="text-sm text-gray-700 mb-4">"{item.quote}"</p>
                  <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-600">
                    {item.title} • {item.company}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Users className="text-[#FF9634]" size={24} />
              <div>
                <div className="text-2xl font-bold text-gray-900">9,999+</div>
                <div className="text-sm text-gray-600">Vetted Professionals</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="text-[#FF9634]" size={24} />
              <div>
                <div className="text-2xl font-bold text-gray-900">960,000+</div>
                <div className="text-sm text-gray-600">Hours Delivered</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="text-[#FF9634]" size={24} />
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            {['welcome', 'payment', 'schedule', 'complete'].map((step, index) => {
              const steps = ['welcome', 'payment', 'schedule', 'complete']
              const currentIndex = steps.indexOf(currentStep)
              const isActive = index === currentIndex
              const isCompleted = index < currentIndex
              
              return (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-[#FF9634] bg-[#FF9634] text-white' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-16 h-1 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
          <div className="text-center text-sm text-gray-600">
            {currentStep === 'welcome' && 'Step 1: Choose Your Plan'}
            {currentStep === 'payment' && 'Step 2: Add Payment Method'}
            {currentStep === 'schedule' && 'Step 3: Schedule Your Call'}
            {currentStep === 'complete' && 'Step 4: All Set!'}
          </div>
        </div>

        {/* Step: Welcome & Pricing */}
        {currentStep === 'welcome' && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 text-lg">
                All plans include a dedicated account manager who will match you with the perfect experts for your needs.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl border-2 p-6 hover:shadow-xl transition-all ${
                    plan.popular ? 'border-[#FF9634] shadow-lg' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                    <div className="text-gray-600 text-sm">per month</div>
                    <div className="text-[#FF9634] font-semibold mt-2">{plan.hours}</div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 text-center">{plan.description}</p>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Social Proof Marquee */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 mb-8 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-wide text-gray-500">Trusted by teams at</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                  Fast-growing companies across industries
                </h3>
              </div>

              <div className="relative overflow-hidden">
                <div className="logo-track">
                  {[...activePartners, ...activePartners].map((partner, index) => (
                    <div
                      key={`${partner.id}-${index}`}
                      className="flex items-center justify-center px-6 py-3 mx-3 rounded-full bg-gray-100 border border-gray-200"
                      aria-hidden={index >= activePartners.length}
                    >
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        width={110}
                        height={44}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 relative overflow-hidden">
                <div className="testimonial-track">
                  {[...testimonials, ...testimonials].map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="min-w-[260px] sm:min-w-[320px] max-w-[360px] mx-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                      aria-hidden={index >= testimonials.length}
                    >
                      <p className="text-sm text-gray-700 mb-4">"{item.quote}"</p>
                      <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.title} • {item.company}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <Shield size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Your Card Won't Be Charged Yet</h4>
                  <p className="text-blue-700 text-sm">
                    We'll securely save your payment method, but you won't be charged until after your strategy call with your account manager. 
                    They'll confirm the right plan for your needs and activate your subscription.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleStartOnboarding}
                className="px-8 py-4 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg shadow-lg"
              >
                Continue to Payment Setup
              </button>
              <p className="text-sm text-gray-500 mt-3">Takes less than 2 minutes</p>
            </div>
          </div>
        )}

        {/* Step: Payment Method */}
        {currentStep === 'payment' && clientSecret && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#E9414C] to-[#FF9634] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={32} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Add Your Payment Method
              </h2>
              <p className="text-gray-600">
                Your card will be authorized but not charged until after your call with your account manager.
              </p>
            </div>

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentMethodForm 
                clientSecret={clientSecret}
                onSuccess={handlePaymentMethodSuccess}
              />
            </Elements>
          </div>
        )}

        {/* Step: Schedule Call */}
        {currentStep === 'schedule' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#E9414C] to-[#FF9634] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Schedule Your Strategy Call
              </h2>
              <p className="text-gray-600 mb-6">
                Book a 15-minute call with your dedicated account manager to discuss your needs and get matched with experts.
              </p>
            </div>

            {/* Calendly Embed */}
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden min-h-[700px]">
              {calendlyUrl ? (
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Schedule a call"
                  className="rounded-xl"
                />
              ) : (
                <div className="p-8 text-center min-h-[500px] flex items-center justify-center">
                  <div>
                    <Calendar size={64} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-6">
                      Calendar integration will be embedded here<br />
                      (Set NEXT_PUBLIC_CALENDLY_URL in environment variables)
                    </p>
                    <button
                      onClick={onScheduleCall || (() => alert('Calendar booking opens here'))}
                      className="px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Open Calendar Booking
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">What Happens Next?</h4>
                  <ul className="text-green-700 text-sm space-y-2">
                    <li>• You'll receive a confirmation email with meeting details</li>
                    <li>• Your account manager will review your business needs</li>
                    <li>• They'll recommend the best plan and activate your subscription</li>
                    <li>• Expert matching begins within 2-4 hours after activation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .logo-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .logo-track:hover {
          animation-play-state: paused;
        }
        .logo-track-slow {
          animation-duration: 28s;
        }
        .testimonial-track {
          display: flex;
          width: max-content;
          animation: testimonials 28s linear infinite;
        }
        .testimonial-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes testimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
