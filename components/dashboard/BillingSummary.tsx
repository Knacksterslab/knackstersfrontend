'use client'

import React, { useEffect, useState } from 'react'
import { Receipt, MoreVertical } from 'lucide-react'
import { billingApi } from '@/lib/api/client'

interface BillingSummaryProps {
  subscription: {
    plan: string
    monthlyHours: number
    priceAmount: number
    nextBillingDate?: Date | null
    currentPeriodEnd: Date
  } | null
}

interface Transaction {
  invoiceNumber: string
  invoiceDate: Date
  total: number
  status: string
  transactionType: string
  paymentMethod?: {
    cardBrand?: string
    cardLastFour?: string
  }
}

export default function BillingSummary({ subscription }: BillingSummaryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const response = await billingApi.getPaymentHistory(5) // Get last 5 transactions
        if (response.success && response.data) {
          setTransactions(response.data)
        }
      } catch (err: any) {
        console.error('Failed to fetch payment history:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const formatPlanName = (plan: string) => {
    return plan.charAt(0) + plan.slice(1).toLowerCase()
  }

  const formatTransactionType = (type: string) => {
    return type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  const formatPaymentMethod = (transaction: Transaction) => {
    if (transaction.paymentMethod?.cardBrand && transaction.paymentMethod?.cardLastFour) {
      return `${transaction.paymentMethod.cardBrand} ending in ${transaction.paymentMethod.cardLastFour}`
    }
    return 'N/A'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Billing Summary</h2>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Subscription Card */}
      {subscription && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4 sm:mb-6">
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
            <p className="text-xs text-gray-600">Next renewal date</p>
            <p className="text-sm font-semibold text-gray-900">
              {subscription.nextBillingDate 
                ? new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : 'N/A'}
            </p>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          {loading ? (
            <div className="py-8 text-center text-sm text-gray-500">Loading transactions...</div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-red-600">Failed to load transactions</div>
          ) : transactions.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">No transactions yet</div>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 whitespace-nowrap">Transaction Type</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 whitespace-nowrap">Date</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 whitespace-nowrap">Invoice ID</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 whitespace-nowrap">Paid</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 whitespace-nowrap">Billing method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">{formatTransactionType(transaction.transactionType)}</td>
                    <td className="py-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Receipt size={14} className="text-gray-400" />
                        {formatDate(transaction.invoiceDate)}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Receipt size={14} className="text-gray-400" />
                        <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                          {transaction.invoiceNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        {formatAmount(transaction.total)}
                        <Receipt size={14} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Receipt size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{formatPaymentMethod(transaction)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <button className="w-full mt-4 py-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
        More Information
      </button>
    </div>
  )
}

