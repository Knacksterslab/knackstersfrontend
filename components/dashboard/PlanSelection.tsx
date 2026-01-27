'use client'

import React, { useState } from 'react'
import { CheckCircle, Sparkles, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PaymentMethodModal from './PaymentMethodModal'
import { getPricingPlansArray } from '@/lib/config/plans'

const pricingPlans = getPricingPlansArray('STARTER')

interface PlanSelectionProps {
  onSubscriptionComplete?: () => void
  hasUpcomingMeeting?: boolean
}

export default function PlanSelection({ onSubscriptionComplete, hasUpcomingMeeting = false }: PlanSelectionProps = {}) {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasPaymentMethod, setHasPaymentMethod] = useState<boolean | null>(null)

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    setError(null)
  }

  const handleScheduleCall = () => {
    // Scroll to or trigger the strategy call booking modal
    const scheduleButton = document.querySelector('[data-action="schedule-call"]') as HTMLElement;
    if (scheduleButton) {
      scheduleButton.click();
    }
  }

  const checkPaymentMethod = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${API_URL}/api/client/stripe/payment-methods`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to check payment methods')
      }

      const data = await response.json()
      const hasMethod = data.success && data.data.paymentMethods && data.data.paymentMethods.length > 0
      setHasPaymentMethod(hasMethod)
      return hasMethod
    } catch (err: any) {
      console.error('Error checking payment methods:', err)
      return false
    }
  }

  const activateSubscription = async () => {
    if (!selectedPlan) return

    setIsProcessing(true)
    setError(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${API_URL}/api/client/stripe/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ plan: selectedPlan })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to activate subscription')
      }

      // Success! Refresh the dashboard to show updated subscription status
      if (onSubscriptionComplete) {
        onSubscriptionComplete()
      } else {
        // Fallback to full page reload if no callback provided
        window.location.reload()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleCheckout = async () => {
    if (!selectedPlan) return

    setIsProcessing(true)
    setError(null)

    try {
      // Check if user has a payment method
      const hasMethod = await checkPaymentMethod()

      if (!hasMethod) {
        // Open payment method modal
        setShowPaymentModal(true)
        setIsProcessing(false)
      } else {
        // Proceed directly to subscription activation
        await activateSubscription()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  const handlePaymentMethodAdded = async () => {
    setShowPaymentModal(false)
    setHasPaymentMethod(true)
    // Automatically proceed with subscription after payment method is added
    await activateSubscription()
  }

  return (
    <div id="plans-section" className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Strategy Call Promotion Banner - Only show if no meeting booked */}
      {!hasUpcomingMeeting && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#E9414C] to-[#FF9634] rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 mb-1">💡 Not sure which plan fits your needs?</h3>
              <p className="text-xs text-gray-700 mb-3">
                Schedule a free 15-minute strategy call with your dedicated account manager. 
                Get expert guidance on choosing the right plan and how to maximize your team's efficiency.
              </p>
              <button
                onClick={handleScheduleCall}
                className="text-xs font-semibold text-[#E9414C] hover:text-[#FF9634] transition-colors underline"
              >
                Schedule Free Strategy Call →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-[#E9414C] to-[#FF9634] rounded-lg flex items-center justify-center">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="text-xs sm:text-sm text-gray-600">Subscribe now and start requesting tasks immediately</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedPlan === plan.name
                ? 'border-[#FF9634] bg-orange-50'
                : plan.popular
                ? 'border-[#FF9634] bg-white'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => handlePlanSelect(plan.name)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{plan.price}</div>
              <div className="text-xs text-gray-600">per month</div>
              <div className="text-sm text-[#FF9634] font-semibold mt-1">{plan.hours}</div>
            </div>

            <p className="text-xs text-gray-600 mb-4 text-center">{plan.description}</p>

            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedPlan === plan.name
                  ? 'bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedPlan === plan.name ? 'Selected ✓' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-900 mb-1">
                {selectedPlan} Plan Selected!
              </p>
              <p className="text-xs text-green-800 mb-3">
                Click "Proceed to Checkout" to {hasPaymentMethod === false ? 'add your payment method and ' : ''}activate your subscription and start requesting tasks immediately. 
                You can schedule your strategy call anytime for optimization tips.
              </p>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout →'
                )}
              </button>
              {error && (
                <p className="text-xs text-red-600 mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentMethodAdded}
      />
    </div>
  )
}
