'use client'

import React from 'react'
import { Clock, CreditCard, MoreVertical } from 'lucide-react'
import { useBilling, useInvoices } from '@/hooks/useBilling'

export default function BillingContent() {
  const { summary, subscription, loading: billingLoading } = useBilling()
  const { invoices, loading: invoicesLoading, payInvoice } = useInvoices()

  const loading = billingLoading || invoicesLoading

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'PAID': 'bg-green-50 text-green-600',
      'PENDING': 'bg-orange-50 text-orange-600',
      'FAILED': 'bg-red-50 text-red-600',
      'CANCELLED': 'bg-gray-50 text-gray-600'
    }
    return styles[status] || 'bg-gray-100 text-gray-600'
  }

  const getStatusText = (status: string) => {
    const text: Record<string, string> = {
      'PAID': 'Paid',
      'PENDING': 'Unpaid',
      'FAILED': 'Failed',
      'CANCELLED': 'Cancelled'
    }
    return text[status] || status
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  const getTransactionTypeText = (type: string) => {
    const types: Record<string, string> = {
      'SUBSCRIPTION_RENEWAL': 'Subscription Renewal',
      'EXTRA_HOURS': 'Additional Hours',
      'SETUP_FEE': 'Setup Fee',
      'REFUND': 'Refund'
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading billing data...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Billing & Subscription</h1>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Clock size={20} />
          Buy Extra Hours
        </button>
      </div>

      {/* Current Plan and Payment Method */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current Plan */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Change
            </button>
          </div>
          
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
                      {subscription.plan.charAt(0) + subscription.plan.slice(1).toLowerCase()} Plan
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
                <p>Current period: {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}</p>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Manage
            </button>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard size={24} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Visa</h3>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">•••• 5432</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Expires 12/2025</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 font-medium rounded">Primary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-gray-900">${summary.totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-orange-600">${summary.totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Failed Payments</p>
            <p className="text-2xl font-bold text-red-600">{summary.totalFailed}</p>
          </div>
        </div>
      )}

      {/* Invoices Table */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Invoices</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Transaction Type
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Invoice ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Paid Amount
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Method
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice: any) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {getTransactionTypeText(invoice.transactionType)}
                        {invoice.subscription && ` - ${invoice.subscription.plan}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(invoice.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(invoice.status)}`}>
                          {getStatusText(invoice.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatAmount(invoice.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {invoice.paymentMethod
                          ? `${invoice.paymentMethod.cardBrand || invoice.paymentMethod.type} •••• ${invoice.paymentMethod.last4}`
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
