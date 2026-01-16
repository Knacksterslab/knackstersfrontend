'use client'

import React from 'react'
import { Star, Clock, TrendingDown } from 'lucide-react'

interface MinutesOverviewProps {
  hoursBalance: {
    totalAvailableHours: number
    hoursUsed: number
    hoursRemaining: number
    usagePercentage: number
  } | null
}

export default function MinutesOverview({ hoursBalance }: MinutesOverviewProps) {
  // Show empty state when no subscription/hours balance
  if (!hoursBalance) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Hours Utilization Overview</h2>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-200 p-8 md:p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Start Tracking Your Hours</h3>
            <p className="text-gray-600 mb-6">
              Choose a subscription plan to unlock hour tracking, task management, and access to our talent network.
            </p>
            <button 
              onClick={() => {
                // Scroll to plans section if it exists, otherwise navigate
                const plansSection = document.getElementById('plans-section');
                if (plansSection) {
                  plansSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/dashboard#plans';
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Star,
      label: 'Total Hours Purchased',
      value: `${hoursBalance.totalAvailableHours} hrs`,
      sublabel: 'Monthly subscription hours',
      progress: 100,
      color: 'blue',
      bgColor: 'bg-blue-500'
    },
    {
      icon: Clock,
      label: 'Hours Used',
      value: `${Math.round(hoursBalance.hoursUsed)} hrs`,
      sublabel: 'Hours utilized this month',
      progress: hoursBalance.usagePercentage,
      color: 'green',
      bgColor: 'bg-green-500'
    },
    {
      icon: TrendingDown,
      label: 'Hours Remaining',
      value: `${Math.round(hoursBalance.hoursRemaining)} hrs`,
      sublabel: 'Available hours for this month',
      progress: 100 - hoursBalance.usagePercentage,
      color: 'orange',
      bgColor: 'bg-orange-500'
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Hours Utilization Overview</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          This Month &gt;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <div className="relative">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stat.bgColor} rounded-full`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                  <span className="absolute -top-5 right-0 text-xs font-semibold text-gray-600">
                    {stat.progress}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.sublabel}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

