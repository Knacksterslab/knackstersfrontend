'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { CheckCircle } from 'lucide-react'
import { useBilling, useInvoices } from '@/hooks/useBilling'
import { billingApi } from '@/lib/api/client'
import PaymentMethodModal from '@/components/dashboard/PaymentMethodModal'
import ChangePlanModal, { type PlanOption } from './ChangePlanModal'
import BillingPlanSection from './BillingPlanSection'
import BillingInvoiceSection from './BillingInvoiceSection'

// Standard rates used for plan-switch modal — onboarding rate applies only at initial activation
const PLANS: PlanOption[] = [
  { id: 'FLEX_RETAINER', name: 'Flex Retainer', price: 7000, hours: 100, description: 'Focused teams and ongoing projects' },
  { id: 'PRO_RETAINER', name: 'Pro Retainer', price: 12500, hours: 200, description: 'Teams running multiple projects', popular: true },
  { id: 'GROWTH', name: 'Growth', price: 25000, hours: 450, description: 'Scaling companies with large teams' },
]

export default function BillingContent() {
  const { subscription, loading: billingLoading, refresh } = useBilling()
  const { invoices, loading: invoicesLoading } = useInvoices()
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [targetPlan, setTargetPlan] = useState<PlanOption | null>(null)
  const [planSuccess, setPlanSuccess] = useState<string | null>(null)
  const [pendingPlanAfterPayment, setPendingPlanAfterPayment] = useState<PlanOption | null>(null)

  const loading = billingLoading || invoicesLoading

  const fetchPaymentMethods = useCallback(async () => {
    try {
      setLoadingPaymentMethods(true)
      const res = await billingApi.getPaymentMethods()
      if ((res as any).success && (res as any).data?.paymentMethods) {
        setPaymentMethods((res as any).data.paymentMethods)
      }
    } finally {
      setLoadingPaymentMethods(false)
    }
  }, [])

  useEffect(() => {
    fetchPaymentMethods()
  }, [fetchPaymentMethods])

  const handlePaymentMethodSuccess = () => {
    setShowPaymentModal(false)
    fetchPaymentMethods()
    refresh()
    if (pendingPlanAfterPayment) {
      setTargetPlan(pendingPlanAfterPayment)
      setPendingPlanAfterPayment(null)
    }
  }

  const handlePlanClick = (plan: PlanOption) => {
    if (paymentMethods.length === 0) {
      setPendingPlanAfterPayment(plan)
      setShowPaymentModal(true)
    } else {
      setTargetPlan(plan)
    }
  }

  const handlePlanConfirmed = () => {
    const plan = targetPlan
    setTargetPlan(null)
    setPlanSuccess(`Successfully switched to ${plan?.name}. Changes may take a moment to reflect.`)
    refresh()
    setTimeout(() => setPlanSuccess(null), 6000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9634] mx-auto mb-4" />
          <p className="text-gray-600">Loading billing data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-sm text-gray-600 mt-2">Manage your subscription and payment information</p>
      </div>

      {planSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-sm text-green-700">
          <CheckCircle size={18} className="flex-shrink-0" />
          {planSuccess}
        </div>
      )}

      <BillingPlanSection
        subscription={subscription as any}
        paymentMethods={paymentMethods}
        loadingPaymentMethods={loadingPaymentMethods}
        plans={PLANS}
        onPlanClick={handlePlanClick}
        onAddPaymentMethod={() => setShowPaymentModal(true)}
      />

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice History</h2>
        <BillingInvoiceSection invoices={invoices as any} />
      </div>

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentMethodSuccess}
      />

      {targetPlan && (
        <ChangePlanModal
          currentPlan={subscription?.plan ?? ''}
          targetPlan={targetPlan}
          onClose={() => setTargetPlan(null)}
          onConfirmed={handlePlanConfirmed}
        />
      )}
    </div>
  )
}
