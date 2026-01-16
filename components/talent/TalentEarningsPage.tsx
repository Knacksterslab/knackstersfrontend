'use client'

import React from 'react'
import TalentPageWrapper from './TalentPageWrapper'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  CreditCard,
  Clock
} from 'lucide-react'

export default function TalentEarningsPage() {
  const paymentHistory = [
    {
      id: '1',
      date: 'Dec 15, 2025',
      period: 'Dec 1-15, 2025',
      project: 'Website Redesign Project',
      hours: 42.5,
      rate: 85,
      amount: 3612.50,
      status: 'Paid'
    },
    {
      id: '2',
      date: 'Nov 30, 2025',
      period: 'Nov 16-30, 2025',
      project: 'Mobile App Development',
      hours: 38,
      rate: 85,
      amount: 3230.00,
      status: 'Paid'
    },
    {
      id: '3',
      date: 'Nov 15, 2025',
      period: 'Nov 1-15, 2025',
      project: 'Q1 Marketing Campaign',
      hours: 35.5,
      rate: 85,
      amount: 3017.50,
      status: 'Paid'
    },
    {
      id: '4',
      date: 'Pending',
      period: 'Dec 16-31, 2025',
      project: 'Multiple Projects',
      hours: 28.5,
      rate: 85,
      amount: 2422.50,
      status: 'Pending'
    }
  ]

  const getStatusColor = (status: string) => {
    return status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
  }

  return (
    <TalentPageWrapper>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings / Payments</h1>
              <p className="text-gray-600">Track your earnings and payment history</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Earned */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign size={24} className="text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">$32,450</h3>
                <p className="text-sm text-gray-600">Total Earned (Lifetime)</p>
              </div>

              {/* This Month */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar size={24} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">$6,035</h3>
                <p className="text-sm text-gray-600">This Month</p>
              </div>

              {/* Pending */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock size={24} className="text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">$2,422.50</h3>
                <p className="text-sm text-gray-600">Pending Payment</p>
              </div>

              {/* Hourly Rate */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp size={24} className="text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">$85/hr</h3>
                <p className="text-sm text-gray-600">Your Rate</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Update
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CreditCard size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Bank Account</p>
                  <p className="text-sm text-gray-600">**** **** **** 8765</p>
                  <p className="text-xs text-gray-500 mt-1">Wells Fargo</p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Date</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Period</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Project</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Hours</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Rate</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Amount</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-b-0">
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.period}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.project}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{payment.hours}h</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${payment.rate}/hr</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Payment Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6">
              <div className="flex items-start gap-3">
                <Calendar size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Next Payment</h3>
                  <p className="text-sm text-green-700">
                    Your next payment of <strong>$2,422.50</strong> is scheduled for <strong>Dec 31, 2025</strong>
                  </p>
                </div>
              </div>
      </div>
    </TalentPageWrapper>
  )
}

