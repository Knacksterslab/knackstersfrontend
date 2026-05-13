'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  transactionType: string
  createdAt: string | Date
  total: number
  status: string
  subscription?: { plan: string } | null
  paymentMethod?: { cardBrand?: string; type?: string; last4?: string; cardLastFour?: string } | null
}

interface BillingInvoiceSectionProps {
  invoices: Invoice[]
}

const STATUS_STYLES: Record<string, string> = {
  PAID: 'bg-green-50 text-green-600',
  PENDING: 'bg-orange-50 text-orange-600',
  FAILED: 'bg-red-50 text-red-600',
  CANCELLED: 'bg-gray-50 text-gray-600',
}

const STATUS_LABELS: Record<string, string> = {
  PAID: 'Paid',
  PENDING: 'Unpaid',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
}

const TRANSACTION_LABELS: Record<string, string> = {
  SUBSCRIPTION_RENEWAL: 'Subscription Renewal',
  EXTRA_HOURS: 'Additional Hours',
  SETUP_FEE: 'Setup Fee',
  REFUND: 'Refund',
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatAmount(amount: number) {
  return `$${(amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
}

export default function BillingInvoiceSection({ invoices }: BillingInvoiceSectionProps) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Sparkles size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm">No invoices yet</p>
          <p className="text-gray-500 text-xs mt-1">Your invoices will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop */}
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {TRANSACTION_LABELS[invoice.transactionType] ?? invoice.transactionType}
                    {invoice.subscription && ` — ${invoice.subscription.plan}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.createdAt)}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatAmount(invoice.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[invoice.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABELS[invoice.status] ?? invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {invoice.paymentMethod
                      ? `${invoice.paymentMethod.cardBrand ?? invoice.paymentMethod.type} •••• ${invoice.paymentMethod.last4 ?? invoice.paymentMethod.cardLastFour}`
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {TRANSACTION_LABELS[invoice.transactionType] ?? invoice.transactionType}
                </h3>
                {invoice.subscription && <p className="text-sm text-gray-600">{invoice.subscription.plan}</p>}
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[invoice.status] ?? 'bg-gray-100 text-gray-600'}`}>
                {STATUS_LABELS[invoice.status] ?? invoice.status}
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
                    {invoice.paymentMethod.cardBrand ?? invoice.paymentMethod.type} •••• {invoice.paymentMethod.last4 ?? invoice.paymentMethod.cardLastFour}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
