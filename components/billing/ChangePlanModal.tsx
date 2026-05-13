'use client'

import React, { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { billingApi } from '@/lib/api/client'

const PLAN_ORDER: string[] = ['TRIAL', 'FLEX_RETAINER', 'PRO_RETAINER', 'GROWTH', 'ENTERPRISE']

export function getPlanDirection(current: string, target: string) {
  const ci = PLAN_ORDER.indexOf(current)
  const ti = PLAN_ORDER.indexOf(target)
  if (ti > ci) return 'upgrade'
  if (ti < ci) return 'downgrade'
  return 'same'
}

export interface PlanOption {
  id: string
  name: string
  price: number
  hours: number
  description: string
  popular?: boolean
}

interface ChangePlanModalProps {
  currentPlan: string
  targetPlan: PlanOption
  onClose: () => void
  onConfirmed: () => void
}

export default function ChangePlanModal({ currentPlan, targetPlan, onClose, onConfirmed }: ChangePlanModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const direction = getPlanDirection(currentPlan, targetPlan.id)
  const directionLabel = direction === 'upgrade' ? 'Upgrade' : direction === 'downgrade' ? 'Downgrade' : 'Switch'
  const directionColor = direction === 'upgrade'
    ? 'bg-green-50 border border-green-200 text-green-700'
    : direction === 'downgrade'
    ? 'bg-orange-50 border border-orange-200 text-orange-700'
    : 'bg-blue-50 border border-blue-200 text-blue-700'

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      await billingApi.changePlan(targetPlan.id)
      onConfirmed()
    } catch (err: any) {
      setError(err.message || 'Failed to change plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{directionLabel} to {targetPlan.name}</h2>
        <p className="text-sm text-gray-500 mb-5">Review and confirm your plan change</p>

        <div className={`rounded-lg border px-4 py-3 text-sm font-medium mb-5 ${directionColor}`}>
          {direction === 'upgrade'
            ? `You are upgrading from ${currentPlan.replace(/_/g, ' ')} to ${targetPlan.name}. Your new plan takes effect immediately.`
            : direction === 'downgrade'
            ? `You are downgrading to ${targetPlan.name}. The change takes effect at the start of your next billing cycle.`
            : `You are switching to ${targetPlan.name}.`}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">New plan</span>
            <span className="font-semibold text-gray-900">{targetPlan.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Monthly price</span>
            <span className="font-semibold text-gray-900">${targetPlan.price.toLocaleString()}/mo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Included hours</span>
            <span className="font-semibold text-gray-900">{targetPlan.hours} hrs/month</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Confirm ${directionLabel}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export { ArrowUp, ArrowDown }
