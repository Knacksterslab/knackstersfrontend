'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/logo';
import SolutionSelector, { SolutionType } from '@/components/signup/SolutionSelector';
import { API_URL } from '@/lib/config/env';

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedSolution, setSelectedSolution] = useState<SolutionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!selectedSolution) {
      setError('Please select your primary need to continue.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const notesEl = document.getElementById('solution-notes') as HTMLTextAreaElement | null;
      const solutionNotes = notesEl?.value || '';

      const res = await fetch(`${API_URL}/api/auth/onboarding`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedSolution, solutionNotes }),
      });

      if (!res.ok) {
        throw new Error('Failed to save your selection. Please try again.');
      }

      // Proceed to book the strategy call — final step before dashboard
      router.push('/schedule/client');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress indicator — 3 steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-600">Account Created</span>
          </div>
          <div className="w-10 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E9414C] to-[#FF9634] flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <span className="text-sm font-medium text-gray-900">Your Needs</span>
          </div>
          <div className="w-10 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-bold">
              3
            </div>
            <span className="text-sm font-medium text-gray-400">Book a Call</span>
          </div>
        </div>

        {/* Solution Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <SolutionSelector
            selectedSolution={selectedSolution}
            onSelect={setSelectedSolution}
          />

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={isLoading || !selectedSolution}
              className="px-8 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Setting up your account…
                </>
              ) : (
                <>
                  Next: Book Your Strategy Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
