'use client'

import React, { useState } from 'react'
import { CheckCircle, Sparkles, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/lib/config/env'
import PaymentMethodModal from './PaymentMethodModal'
import { getPricingPlansArray } from '@/lib/config/plans'

const pricingPlans = getPricingPlansArray('PRO_RETAINER')

interface PlanSelectionProps {
  onSubscriptionComplete?: () => void
  hasUpcomingMeeting?: boolean
  onScheduleCall?: () => void
}

export default function PlanSelection({ onSubscriptionComplete, hasUpcomingMeeting = false, onScheduleCall }: PlanSelectionProps = {}) {
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
    if (onScheduleCall) {
      onScheduleCall();
    } else {
      router.push('/meetings');
    }
  }

  const checkPaymentMethod = async () => {
    try {
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
      // Free trial — no payment method needed
      if (selectedPlan === 'TRIAL') {
        await activateSubscription()
        return
      }

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
                Schedule a free 15-minute strategy call with your dedicated Customer Success Manager. 
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

      {/* Always horizontally scrollable — 5 plans need room */}
      <div className="overflow-x-auto pb-3 pt-5 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {pricingPlans.map((plan) => {
            const isTrial = plan.name === 'TRIAL'
            const isSelected = selectedPlan === plan.name
            const isPopular = plan.popular && !plan.badge

            return (
              <div
                key={plan.name}
                style={{ width: '220px', flexShrink: 0 }}
                className={`relative flex flex-col rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5 ${
                  isSelected
                    ? 'border-2 border-[#FF9634] shadow-lg'
                    : isPopular
                    ? 'border-2 border-[#FF9634]'
                    : isTrial
                    ? 'border-2 border-green-400'
                    : 'border border-gray-200'
                } bg-white`}
                onClick={() => handlePlanSelect(plan.name)}
              >
                {/* Badge */}
                {(isPopular || plan.badge) && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className={`${isTrial ? 'bg-green-500' : 'bg-gradient-to-r from-[#E9414C] to-[#FF9634]'} text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-sm`}>
                      {plan.badge ?? 'Most Popular'}
                    </span>
                  </div>
                )}

                {/* Coloured top accent bar */}
                <div className={`h-1 w-full rounded-t-2xl ${
                  isTrial ? 'bg-green-400' : isPopular || isSelected ? 'bg-gradient-to-r from-[#E9414C] to-[#FF9634]' : 'bg-gray-200'
                }`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Plan name */}
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {plan.displayName ?? plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-0.5">
                    <span className="text-2xl font-extrabold text-gray-900 leading-none">
                      {plan.price}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {plan.price === 'Free' ? '30-day trial' : 'per month'}
                  </div>

                  {/* Hours */}
                  <div className={`text-sm font-bold mb-3 ${isTrial ? 'text-green-600' : 'text-[#FF9634]'}`}>
                    {plan.hours}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 mb-4" />

                  {/* Features */}
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
                        <CheckCircle
                          size={14}
                          className={`flex-shrink-0 mt-0.5 ${isTrial ? 'text-green-500' : 'text-[#FF9634]'}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white shadow-md'
                        : isTrial
                        ? 'bg-green-50 text-green-700 border border-green-300 hover:bg-green-100'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {isSelected ? 'Selected ✓' : isTrial ? 'Start Free Trial' : 'Subscribe Now'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedPlan && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-900 mb-1">
                {pricingPlans.find(p => p.name === selectedPlan)?.displayName ?? selectedPlan} Selected!
              </p>
              <p className="text-xs text-green-800 mb-3">
                {selectedPlan === 'TRIAL'
                  ? 'Click "Start Free Trial" to activate your 50-hour trial. No payment method required.'
                  : `Click "Proceed to Checkout" to ${hasPaymentMethod === false ? 'add your payment method and ' : ''}activate your subscription and start requesting tasks immediately.`}
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
                ) : selectedPlan === 'TRIAL' ? (
                  'Start Free Trial →'
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
