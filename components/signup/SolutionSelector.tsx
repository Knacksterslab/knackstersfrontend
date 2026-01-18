'use client';

import React from 'react';

export type SolutionType = 
  | 'AI_MACHINE_LEARNING'
  | 'CYBERSECURITY'
  | 'SOFTWARE_DEVELOPMENT'
  | 'DESIGN_CREATIVE'
  | 'MARKETING_GROWTH'
  | 'HEALTHCARE_LIFE_SCIENCES'
  | 'MULTIPLE'
  | 'OTHER';

export interface SolutionOption {
  id: SolutionType;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export const solutionOptions: SolutionOption[] = [
  {
    id: 'AI_MACHINE_LEARNING',
    title: 'AI & Machine Learning',
    description: 'Strategy, implementation, and AI-powered solutions',
    icon: '🤖',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'CYBERSECURITY',
    title: 'Cybersecurity',
    description: 'Protect your digital assets with expert security',
    icon: '🛡️',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 'SOFTWARE_DEVELOPMENT',
    title: 'Software Development',
    description: 'Full-stack, DevOps, and cloud-native solutions',
    icon: '💻',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'DESIGN_CREATIVE',
    title: 'Design & Creative',
    description: 'UX/UI design and captivating visual experiences',
    icon: '🎨',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    id: 'MARKETING_GROWTH',
    title: 'Marketing & Growth',
    description: 'SEO, content, and digital marketing strategies',
    icon: '📈',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'HEALTHCARE_LIFE_SCIENCES',
    title: 'Healthcare & Life Sciences',
    description: 'Clinical trials, data management, and compliance',
    icon: '🏥',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

interface SolutionSelectorProps {
  selectedSolution: SolutionType | null;
  onSelect: (solution: SolutionType) => void;
}

export default function SolutionSelector({
  selectedSolution,
  onSelect,
}: SolutionSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          What brings you to Knacksters?
        </h2>
        <p className="text-gray-600">
          Select your primary need so we can match you with the right expert
        </p>
      </div>

      {/* Solution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solutionOptions.map((solution) => (
          <button
            key={solution.id}
            type="button"
            onClick={() => onSelect(solution.id)}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-200 text-left
              hover:shadow-lg hover:-translate-y-1
              ${
                selectedSolution === solution.id
                  ? 'border-[#E9414C] bg-red-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            {/* Selection Indicator */}
            {selectedSolution === solution.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#E9414C] to-[#FC8838] rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Icon */}
            <div className="text-4xl mb-3">{solution.icon}</div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2">
              {solution.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {solution.description}
            </p>
          </button>
        ))}

        {/* Other Option */}
        <button
          type="button"
          onClick={() => onSelect('OTHER')}
          className={`
            relative p-6 rounded-xl border-2 transition-all duration-200 text-left
            hover:shadow-lg hover:-translate-y-1
            ${
              selectedSolution === 'OTHER'
                ? 'border-[#E9414C] bg-red-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }
          `}
        >
          {selectedSolution === 'OTHER' && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 bg-gradient-to-r from-[#E9414C] to-[#FC8838] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="text-4xl mb-3">💼</div>
          <h3 className="font-semibold text-gray-900 mb-2">Other / Multiple</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            I need help with multiple areas or something else
          </p>
        </button>
      </div>

      {/* Additional Notes (optional) */}
      {selectedSolution && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anything else you'd like us to know? (Optional)
          </label>
          <textarea
            id="solution-notes"
            rows={3}
            placeholder="Tell us more about your needs..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9414C] focus:border-transparent resize-none"
          />
        </div>
      )}
    </div>
  );
}
