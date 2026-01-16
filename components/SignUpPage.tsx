'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import KnackstersButton from '@/components/svg/knacksters-button';
import OnboardingFooter from '@/components/shared/OnboardingFooter';
import { toast } from 'react-toastify';
import { signUp } from 'supertokens-auth-react/recipe/emailpassword';

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Use SuperTokens SDK for signup
      const response = await signUp({
        formFields: [
          { id: 'email', value: formData.email },
          { id: 'password', value: formData.password },
          { id: 'name', value: `${formData.firstName} ${formData.lastName}` },
          { id: 'role', value: 'client' },
        ],
      });

      if (response.status === 'OK') {
        // Save additional data to backend (company name, etc.) if needed
        if (formData.company) {
          console.log('Company info:', formData.company);
        }

        toast.success('Account created successfully!');
        
        // Wait for session to be fully established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Session is automatically created by SuperTokens SDK
        // Redirect to schedule page for onboarding call
        router.push('/schedule');
      } else if (response.status === 'FIELD_ERROR') {
        const fieldErrors = response.formFields
          .filter((f: any) => f.error)
          .map((f: any) => f.error)
          .join(', ');
        setError(fieldErrors || 'Please check your input');
      } else if (response.status === 'SIGN_UP_NOT_ALLOWED') {
        setError(response.reason || 'Sign up is not allowed');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 sm:py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center" style={{ gap: '10px' }}>
            <Image 
              src="/logo.svg" 
              alt="Knacksters Logo" 
              width={40} 
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
              priority
            />
            <h1 
              className="text-gray-900 text-xl sm:text-2xl"
              style={{ 
                fontFamily: 'var(--font-public-sans), sans-serif',
                fontWeight: 600,
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              Knacksters
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 relative">
          <div className="w-full max-w-lg">

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <ArrowRight size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">
                By Signing up, you agree to our{' '}
                <a href="/terms" className="text-red-500 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-red-500 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E9414C] to-[#FF9634] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign up'
              )}
            </button>

            {/* Already have account */}
            <div className="text-center pt-2">
              <a href="/login" className="text-red-500 text-sm hover:underline">
                Already have an account? Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-200 p-8 lg:p-12 items-center justify-center relative overflow-hidden min-h-[400px] lg:min-h-0">
        <div className="max-w-lg w-full">
          {/* Top Card - Extended Subscription */}
          <div className="absolute top-12 lg:top-24 right-12 lg:right-24 bg-white rounded-xl shadow-lg p-3 sm:p-4 transform rotate-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-200 rounded"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Extended Subscription</p>
                <p className="text-sm font-semibold">$48.89 / mo</p>
              </div>
            </div>
          </div>

          {/* Minutes Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-6 lg:mb-8 transform -rotate-2">
            <div className="mb-4 lg:mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">600 m</h3>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-3 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">100%</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Total Minutes Purchased</p>
              <p className="text-xs text-gray-400">Overall Minutes from the subscription</p>
            </div>
          </div>

          {/* Bottom Card Placeholder */}
          <div className="absolute bottom-24 lg:bottom-32 left-12 lg:left-24 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-2 lg:p-3 transform -rotate-1">
            <div className="w-20 lg:w-24 h-6 lg:h-8 bg-white bg-opacity-70 rounded"></div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6" style={{ fontFamily: 'Courier New, monospace' }}>
              Embark
            </h2>
            <p className="text-2xl lg:text-4xl text-gray-900" style={{ fontFamily: 'Courier New, monospace' }}>
              on a journey of
            </p>
            <p className="text-2xl lg:text-4xl text-gray-900" style={{ fontFamily: 'Courier New, monospace' }}>
              growth.
            </p>
          </div>

          {/* Bottom Right Card - Task */}
          <div className="absolute bottom-16 lg:bottom-24 right-16 lg:right-32 bg-white rounded-xl shadow-lg p-3 lg:p-4 transform rotate-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Task Name</p>
                <p className="text-sm font-medium text-gray-900">Some Task Name #001</p>
              </div>
            </div>
          </div>

          {/* Bottom Left - Avatar */}
          <div className="absolute bottom-8 lg:bottom-12 left-16 lg:left-32 bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 rounded-full"></div>
            <p className="text-xs text-gray-600">Albert Flores</p>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <OnboardingFooter />
    </div>
  );
}

