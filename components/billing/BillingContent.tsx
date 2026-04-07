'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { CreditCard, Sparkles, CheckCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { useBilling, useInvoices } from '@/hooks/useBilling'
import { billingApi } from '@/lib/api/client'
import PaymentMethodModal from '@/components/dashboard/PaymentMethodModal'

// ─── Plan definitions (mirrors backend PLAN_CONFIG) ──────────────────────────

const PLANS = [
  {
    id: 'FLEX_RETAINER',
    name: 'Flex Retainer',
    price: 7000,
    hours: 100,
    description: 'Focused teams and ongoing projects',
  },
  {
    id: 'PRO_RETAINER',
    name: 'Pro Retainer',
    price: 12500,
    hours: 200,
    description: 'Teams running multiple projects simultaneously',
    popular: true,
  },
  {
    id: 'GROWTH',
    name: 'Growth',
    price: 25000,
    hours: 450,
    description: 'Scaling companies with large teams',
  },
] as const

type PlanId = typeof PLANS[number]['id']

const PLAN_ORDER: string[] = ['TRIAL', 'FLEX_RETAINER', 'PRO_RETAINER', 'GROWTH', 'ENTERPRISE']

function getPlanDirection(current: string, target: PlanId) {
  const ci = PLAN_ORDER.indexOf(current)
  const ti = PLAN_ORDER.indexOf(target)
  if (ti > ci) return 'upgrade'
  if (ti < ci) return 'downgrade'
  return 'same'
}

// ─── Change Plan Modal ────────────────────────────────────────────────────────

interface ChangePlanModalProps {
  currentPlan: string
  targetPlan: typeof PLANS[number]
  onClose: () => void
  onConfirmed: () => void
}

function ChangePlanModal({ currentPlan, targetPlan, onClose, onConfirmed }: ChangePlanModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const direction = getPlanDirection(currentPlan, targetPlan.id)

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await billingApi.changePlan(targetPlan.id)
      if ((res as any).success) {
        onConfirmed()
      } else {
        setError((res as any).error || 'Failed to change plan')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to change plan')
    } finally {
      setLoading(false)
    }
  }

  const directionLabel = direction === 'upgrade' ? 'Upgrade' : direction === 'downgrade' ? 'Downgrade' : 'Switch'
  const directionColor = direction === 'upgrade'
    ? 'bg-green-50 border-green-200 text-green-700'
    : direction === 'downgrade'
    ? 'bg-orange-50 border-orange-200 text-orange-700'
    : 'bg-blue-50 border-blue-200 text-blue-700'

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BillingContent() {
  const { subscription, loading: billingLoading, refresh } = useBilling()
  const { invoices, loading: invoicesLoading } = useInvoices()
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [targetPlan, setTargetPlan] = useState<typeof PLANS[number] | null>(null)
  const [planSuccess, setPlanSuccess] = useState<string | null>(null)
  const [pendingPlanAfterPayment, setPendingPlanAfterPayment] = useState<typeof PLANS[number] | null>(null)

  const loading = billingLoading || invoicesLoading

  const fetchPaymentMethods = useCallback(async () => {
    try {
      setLoadingPaymentMethods(true)
      const res = await billingApi.getPaymentMethods()
      if ((res as any).success && (res as any).data?.paymentMethods) {
        setPaymentMethods((res as any).data.paymentMethods)
      }
    } catch (err) {
      console.error('Failed to fetch payment methods:', err)
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
    // If the client was trying to upgrade before adding a card, continue to the plan modal
    if (pendingPlanAfterPayment) {
      setTargetPlan(pendingPlanAfterPayment)
      setPendingPlanAfterPayment(null)
    }
  }

  const handlePlanClick = (plan: typeof PLANS[number]) => {
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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'PAID': 'bg-green-50 text-green-600',
      'PENDING': 'bg-orange-50 text-orange-600',
      'FAILED': 'bg-red-50 text-red-600',
      'CANCELLED': 'bg-gray-50 text-gray-600',
    }
    return styles[status] || 'bg-gray-100 text-gray-600'
  }

  const getStatusText = (status: string) => {
    const text: Record<string, string> = {
      'PAID': 'Paid',
      'PENDING': 'Unpaid',
      'FAILED': 'Failed',
      'CANCELLED': 'Cancelled',
    }
    return text[status] || status
  }

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

  const formatAmount = (amount: number) =>
    `$${(amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  const getTransactionTypeText = (type: string) => {
    const types: Record<string, string> = {
      'SUBSCRIPTION_RENEWAL': 'Subscription Renewal',
      'EXTRA_HOURS': 'Additional Hours',
      'SETUP_FEE': 'Setup Fee',
      'REFUND': 'Refund',
    }
    return types[type] || type
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

  const currentPlanId = subscription?.plan ?? ''

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-sm text-gray-600 mt-2">Manage your subscription and payment information</p>
      </div>

      {/* Plan change success banner */}
      {planSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-sm text-green-700">
          <CheckCircle size={18} className="flex-shrink-0" />
          {planSuccess}
        </div>
      )}

      {/* Current Plan and Payment Method */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current Plan */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Current Plan</h2>
          {subscription ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {subscription.plan.charAt(0) + subscription.plan.slice(1).toLowerCase().replace(/_/g, ' ')} Plan
                    </h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      subscription.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{subscription.monthlyHours} hours/month</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatAmount(subscription.priceAmount)} <span className="text-lg font-normal text-gray-500">/mo</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-1">Next billing: {formatDate(subscription.nextBillingDate || subscription.currentPeriodEnd)}</p>
                <p>Current period: {formatDate(subscription.currentPeriodStart)} – {formatDate(subscription.currentPeriodEnd)}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-gray-500">No active subscription</p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {loadingPaymentMethods ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9634]" />
              </div>
            ) : paymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 text-sm mb-4">No payment method on file</p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors"
                >
                  Add Payment Method
                </button>
              </div>
            ) : (
              <div>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard size={24} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize mb-1">
                        {method.cardBrand || method.type}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">•••• {method.cardLastFour || method.last4}</p>
                      {method.cardExpMonth && method.cardExpYear && (
                        <p className="text-xs text-gray-500">Expires {method.cardExpMonth}/{method.cardExpYear}</p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-4 w-full px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Replace Payment Method
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Plan */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Change Plan</h2>
        <p className="text-sm text-gray-500 mb-4">Upgrade or downgrade your subscription at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map(plan => {
            const direction = getPlanDirection(currentPlanId, plan.id)
            const isCurrent = direction === 'same'

            let actionIcon = null
            let buttonLabel = ''
            let buttonClass = ''

            if (isCurrent) {
              actionIcon = <Minus size={14} />
              buttonLabel = 'Current Plan'
              buttonClass = 'bg-gray-100 text-gray-500 cursor-default'
            } else if (direction === 'upgrade') {
              actionIcon = <ArrowUp size={14} />
              buttonLabel = 'Upgrade'
              buttonClass = 'bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white hover:opacity-90'
            } else {
              actionIcon = <ArrowDown size={14} />
              buttonLabel = 'Downgrade'
              buttonClass = 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-xl border p-5 flex flex-col transition-shadow ${
                  isCurrent ? 'border-[#FF9634] ring-1 ring-[#FF9634]' : ('popular' in plan && plan.popular) ? 'border-[#5A1568]' : 'border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{plan.name}</p>
                    {'popular' in plan && plan.popular && !isCurrent && (
                      <span className="text-xs font-semibold text-[#5A1568]">Most Popular</span>
                    )}
                    {isCurrent && (
                      <span className="text-xs font-semibold text-[#FF9634]">Your plan</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${plan.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">/month</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">{plan.hours} hours · {plan.description}</p>
                <button
                  disabled={isCurrent}
                  onClick={() => !isCurrent && handlePlanClick(plan)}
                  className={`mt-auto w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${buttonClass}`}
                >
                  {actionIcon}
                  {buttonLabel}
                </button>
              </div>
            )
          })}
        </div>

        {/* Enterprise row */}
        <div className="mt-4 bg-gray-900 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white">Enterprise</p>
            <p className="text-sm text-gray-400 mt-0.5">Custom hours · White-label options · Dedicated success team · SLA guarantees</p>
          </div>
          <a
            href="mailto:connect@knacksters.co?subject=Enterprise Plan Enquiry"
            className="flex-shrink-0 px-5 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Contact Sales
          </a>
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice History</h2>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Sparkles size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">No invoices yet</p>
              <p className="text-gray-500 text-xs mt-1">Your invoices will appear here</p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {['Description', 'Date', 'Invoice #', 'Amount', 'Status', 'Payment Method'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice: any) => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {getTransactionTypeText(invoice.transactionType)}
                          {invoice.subscription && ` — ${invoice.subscription.plan}`}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.createdAt)}</td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-600">{invoice.invoiceNumber}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatAmount(invoice.total)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {invoice.paymentMethod
                            ? `${invoice.paymentMethod.cardBrand || invoice.paymentMethod.type} •••• ${invoice.paymentMethod.last4}`
                            : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {invoices.map((invoice: any) => (
                <div key={invoice.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{getTransactionTypeText(invoice.transactionType)}</h3>
                      {invoice.subscription && <p className="text-sm text-gray-600">{invoice.subscription.plan}</p>}
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-semibold text-gray-900">{formatAmount(invoice.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="text-gray-900">{formatDate(invoice.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Invoice #</span>
                      <span className="font-mono text-gray-900">{invoice.invoiceNumber}</span>
                    </div>
                    {invoice.paymentMethod && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment</span>
                        <span className="text-gray-900">
                          {invoice.paymentMethod.cardBrand || invoice.paymentMethod.type} •••• {invoice.paymentMethod.last4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentMethodSuccess}
      />

      {targetPlan && (
        <ChangePlanModal
          currentPlan={currentPlanId}
          targetPlan={targetPlan}
          onClose={() => setTargetPlan(null)}
          onConfirmed={handlePlanConfirmed}
        />
      )}
    </div>
  )
}
