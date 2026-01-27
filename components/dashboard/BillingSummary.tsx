'use client'

import React from 'react'
import { Receipt, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BillingSummaryProps {
  subscription: {
    plan: string
    monthlyHours: number
    priceAmount: number
    nextBillingDate?: Date | null
    currentPeriodEnd: Date
  } | null
}

export default function BillingSummary({ subscription }: BillingSummaryProps) {
  const router = useRouter()

  const formatPlanName = (plan: string) => {
    return plan.charAt(0) + plan.slice(1).toLowerCase()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Billing Summary</h2>
      </div>

      {/* Subscription Card */}
      {subscription ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Receipt size={24} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">{formatPlanName(subscription.plan)} Plan</h3>
              <p className="text-xs text-gray-600">
                ${(subscription.priceAmount / 100).toLocaleString()} / mo • {subscription.monthlyHours} hours included
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-gray-600">Next renewal</p>
              <p className="text-sm font-semibold text-gray-900">
                {subscription.nextBillingDate 
                  ? new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* View Full Billing Button */}
          <button 
            onClick={() => router.push('/billing')}
            className="w-full py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View Full Billing Details
            <ArrowRight size={16} />
          </button>
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Receipt size={24} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-4">No active subscription</p>
          <button 
            onClick={() => router.push('/billing')}
            className="px-6 py-2 bg-[#FF9634] text-white text-sm font-semibold rounded-lg hover:bg-[#E88530] transition-colors"
          >
            View Billing
          </button>
        </div>
      )}
    </div>
  )
}

