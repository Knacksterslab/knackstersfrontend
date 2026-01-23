'use client'

import React, { useEffect, useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentMethodForm from './PaymentMethodForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface PaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function PaymentMethodModal({ isOpen, onClose, onSuccess }: PaymentMethodModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch SetupIntent when modal opens
  useEffect(() => {
    if (isOpen && !clientSecret) {
      fetchSetupIntent()
    }
  }, [isOpen])

  const fetchSetupIntent = async () => {
    setLoading(true)
    setError(null)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/client/stripe/setup-intent`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to initialize payment setup')
      }

      const data = await response.json()
      if (data.success && data.data.clientSecret) {
        setClientSecret(data.data.clientSecret)
      } else {
        throw new Error(data.error || 'Failed to get client secret')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    setClientSecret(null) // Reset for next time
    onSuccess()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Payment Method</h2>
            <p className="text-sm text-gray-600 mt-1">
              Securely add your payment method to activate your subscription
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={48} className="text-[#FF9634] animate-spin mb-4" />
              <p className="text-gray-600">Initializing secure payment form...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={fetchSetupIntent}
                className="mt-3 text-sm text-red-700 font-semibold hover:text-red-800"
              >
                Try Again
              </button>
            </div>
          )}

          {clientSecret && !loading && !error && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#FF9634',
                    borderRadius: '8px',
                  },
                },
              }}
            >
              <PaymentMethodForm clientSecret={clientSecret} onSuccess={handleSuccess} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}
