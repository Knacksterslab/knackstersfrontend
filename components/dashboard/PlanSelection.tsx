'use client'

import React, { useState } from 'react'
import { CheckCircle, Sparkles } from 'lucide-react'

const pricingPlans = [
  {
    name: 'STARTER',
    price: '$12,500',
    priceValue: 12500,
    hours: '200 hours',
    description: 'Perfect for growing teams',
    features: ['200 hours per month', 'Dedicated account manager', 'Expert matching in 2-4 hours', '24/7 support'],
    popular: true,
  },
  {
    name: 'GROWTH',
    price: '$25,000',
    priceValue: 25000,
    hours: '450 hours',
    description: 'For scaling businesses',
    features: ['450 hours per month', 'Priority account manager', 'Expert matching in 1-2 hours', 'Quarterly strategy reviews'],
    popular: false,
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    priceValue: 0,
    hours: 'Unlimited',
    description: 'Tailored solutions',
    features: ['Custom hours allocation', 'Dedicated success team', 'Instant expert matching', 'Custom SLAs & contracts'],
    popular: false,
  },
]

export default function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    // In future: save to backend or show confirmation
    console.log('Plan selected:', planName)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-[#E9414C] to-[#FF9634] rounded-lg flex items-center justify-center">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="text-xs sm:text-sm text-gray-600">Select a plan to get started with your team</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your account manager will confirm the best plan for your needs during your strategy call. You can change your plan anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedPlan === plan.name
                ? 'border-[#FF9634] bg-orange-50'
                : plan.popular
                ? 'border-[#FF9634] bg-white'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => handlePlanSelect(plan.name)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-1">{plan.price}</div>
              <div className="text-xs text-gray-600">per month</div>
              <div className="text-sm text-[#FF9634] font-semibold mt-1">{plan.hours}</div>
            </div>

            <p className="text-xs text-gray-600 mb-4 text-center">{plan.description}</p>

            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedPlan === plan.name
                  ? 'bg-[#FF9634] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>{selectedPlan} Plan selected!</strong> Your account manager will review this selection during your strategy call and activate your subscription.
          </p>
        </div>
      )}
    </div>
  )
}
