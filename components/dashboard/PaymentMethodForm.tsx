'use client'

import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Lock, AlertCircle } from 'lucide-react'

interface PaymentMethodFormProps {
  clientSecret: string
  onSuccess: () => void
}

export default function PaymentMethodForm({ clientSecret, onSuccess }: PaymentMethodFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError(null)

    try {
      // Confirm the SetupIntent
      const { setupIntent, error: confirmError } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href, // Not used, we handle success here
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message || 'Payment method setup failed')
        setProcessing(false)
        return
      }

      if (setupIntent && setupIntent.status === 'succeeded') {
        // Notify backend that payment method was saved
        const response = await fetch('http://localhost:5000/api/client/stripe/confirm-payment-method', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            setupIntentId: setupIntent.id,
          }),
        })

        const data = await response.json()

        if (data.success) {
          onSuccess()
        } else {
          setError(data.error || 'Failed to save payment method')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border-2 border-gray-200 p-6 sm:p-8">
      {/* Security Badge */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 justify-center">
        <Lock size={16} className="text-green-600" />
        <span>Secured by Stripe • Your card details are encrypted</span>
      </div>

      {/* Payment Element */}
      <div className="mb-6">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Important:</strong> We'll authorize your card with a $0 or $1 temporary hold to verify it's valid. 
          This hold will be released immediately. You won't be charged until after your strategy call.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full px-6 py-4 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Securely Save Payment Method'
        )}
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}
