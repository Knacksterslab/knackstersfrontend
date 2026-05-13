'use client'

import React from 'react'
import { CreditCard, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { getPlanDirection, type PlanOption } from './ChangePlanModal'

interface Subscription {
  plan: string
  status: string
  monthlyHours: number
  priceAmount: number
  recurringPriceAmount?: number | null
  nextBillingDate?: string | Date | null
  currentPeriodStart: string | Date
  currentPeriodEnd: string | Date
}

interface PaymentMethod {
  id: string
  cardBrand?: string
  type?: string
  cardLastFour?: string
  last4?: string
  cardExpMonth?: number
  cardExpYear?: number
}

interface BillingPlanSectionProps {
  subscription: Subscription | null
  paymentMethods: PaymentMethod[]
  loadingPaymentMethods: boolean
  plans: PlanOption[]
  onPlanClick: (plan: PlanOption) => void
  onAddPaymentMethod: () => void
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatAmount(cents: number) {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
}

export default function BillingPlanSection({
  subscription,
  paymentMethods,
  loadingPaymentMethods,
  plans,
  onPlanClick,
  onAddPaymentMethod,
}: BillingPlanSectionProps) {
  const currentPlanId = subscription?.plan ?? ''
  // Show recurring standard rate for /mo label; fall back to priceAmount for non-onboarding plans
  const displayMonthlyAmount = subscription
    ? (subscription.recurringPriceAmount ?? subscription.priceAmount)
    : 0

  return (
    <>
      {/* Current Plan + Payment Method */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  {formatAmount(displayMonthlyAmount)} <span className="text-lg font-normal text-gray-500">/mo</span>
                </div>
                {subscription.recurringPriceAmount && subscription.priceAmount !== subscription.recurringPriceAmount && (
                  <p className="text-xs text-[#FF9634]">
                    Onboarding period: {formatAmount(subscription.priceAmount)} this month
                  </p>
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-1">Next billing: {formatDate(subscription.nextBillingDate ?? subscription.currentPeriodEnd)}</p>
                <p>Current period: {formatDate(subscription.currentPeriodStart)} – {formatDate(subscription.currentPeriodEnd)}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-gray-500">No active subscription</p>
            </div>
          )}
        </div>

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
                  onClick={onAddPaymentMethod}
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
                        {method.cardBrand ?? method.type}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">•••• {method.cardLastFour ?? method.last4}</p>
                      {method.cardExpMonth && method.cardExpYear && (
                        <p className="text-xs text-gray-500">Expires {method.cardExpMonth}/{method.cardExpYear}</p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={onAddPaymentMethod}
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
        <p className="text-sm text-gray-500 mb-4">
          Upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map(plan => {
            const direction = getPlanDirection(currentPlanId, plan.id)
            const isCurrent = direction === 'same'
            const actionIcon = isCurrent ? <Minus size={14} /> : direction === 'upgrade' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
            const buttonLabel = isCurrent ? 'Current Plan' : direction === 'upgrade' ? 'Upgrade' : 'Downgrade'
            const buttonClass = isCurrent
              ? 'bg-gray-100 text-gray-500 cursor-default'
              : direction === 'upgrade'
              ? 'bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white hover:opacity-90'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-xl border p-5 flex flex-col transition-shadow ${
                  isCurrent ? 'border-[#FF9634] ring-1 ring-[#FF9634]' : plan.popular ? 'border-[#5A1568]' : 'border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{plan.name}</p>
                    {plan.popular && !isCurrent && <span className="text-xs font-semibold text-[#5A1568]">Most Popular</span>}
                    {isCurrent && <span className="text-xs font-semibold text-[#FF9634]">Your plan</span>}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${plan.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">/month</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">{plan.hours} hours · {plan.description}</p>
                <button
                  disabled={isCurrent}
                  onClick={() => !isCurrent && onPlanClick(plan)}
                  className={`mt-auto w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${buttonClass}`}
                >
                  {actionIcon}
                  {buttonLabel}
                </button>
              </div>
            )
          })}
        </div>

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
    </>
  )
}
