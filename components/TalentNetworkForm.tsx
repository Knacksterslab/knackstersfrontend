'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CreditCard, Globe, Clock, ArrowRight, Plus, X } from 'lucide-react';
import KnackstersButton from '@/components/svg/knacksters-button';
import OnboardingFooter from '@/components/shared/OnboardingFooter';
import { talentApplicationApi } from '@/lib/api/client';

export default function TalentNetworkForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [profileUrls, setProfileUrls] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    primaryExpertise: '',
    additionalSkills: '',
    currentEmploymentStatus: '',
    preferredWorkType: '',
    hourlyRate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.primaryExpertise.trim()) {
      errors.primaryExpertise = 'Primary expertise is required';
    } else if (formData.primaryExpertise.length < 10) {
      errors.primaryExpertise = 'Please provide at least 10 characters describing your expertise';
    }
    
    if (!formData.currentEmploymentStatus) {
      errors.currentEmploymentStatus = 'Please select your current employment status';
    }
    
    if (!formData.preferredWorkType) {
      errors.preferredWorkType = 'Please select your preferred work type';
    }
    
    if (!formData.hourlyRate.trim()) {
      errors.hourlyRate = 'Hourly rate is required';
    } else if (parseFloat(formData.hourlyRate) <= 0) {
      errors.hourlyRate = 'Please enter a valid hourly rate greater than 0';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCurrentEmploymentStatus = (status: string) => {
    setFormData({
      ...formData,
      currentEmploymentStatus: status
    });
  };

  const handlePreferredWorkType = (type: string) => {
    setFormData({
      ...formData,
      preferredWorkType: type
    });
  };

  const handleAddProfileUrl = () => {
    setProfileUrls([...profileUrls, '']);
  };

  const handleProfileUrlChange = (index: number, value: string) => {
    const updated = [...profileUrls];
    updated[index] = value;
    setProfileUrls(updated);
  };

  const handleRemoveProfileUrl = (index: number) => {
    if (profileUrls.length > 1) {
      setProfileUrls(profileUrls.filter((_, i) => i !== index));
    }
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate form
      if (!validateForm()) {
        setError('Please fix the errors below before continuing');
        setLoading(false);
        // Scroll to first error
        const firstErrorField = Object.keys(fieldErrors)[0];
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // Convert form values to API format (dashes to underscores for enums)
      const employmentStatusMap: { [key: string]: string } = {
        'full-time-employed': 'FULL_TIME_EMPLOYED',
        'part-time-employed': 'PART_TIME_EMPLOYED',
        'self-employed': 'SELF_EMPLOYED',
        'between-opportunities': 'BETWEEN_OPPORTUNITIES',
      };
      
      const workTypeMap: { [key: string]: string } = {
        'full-time': 'FULL_TIME',
        'part-time': 'PART_TIME',
        'freelance-contract': 'FREELANCE_CONTRACT',
        'flexible': 'FLEXIBLE',
      };
      
      // Filter out empty URLs and submit application to backend
      const validProfileUrls = profileUrls.filter(url => url.trim() !== '');
      
      const response = await talentApplicationApi.apply({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        primaryExpertise: formData.primaryExpertise,
        additionalSkills: formData.additionalSkills || undefined,
        profileUrls: validProfileUrls.length > 0 ? validProfileUrls : undefined,
        currentEmploymentStatus: employmentStatusMap[formData.currentEmploymentStatus],
        preferredWorkType: workTypeMap[formData.preferredWorkType],
        hourlyRate: parseFloat(formData.hourlyRate),
      });
      
      if (response.success && response.data?.profileId) {
        // Store profile ID for next step
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('talentProfileId', response.data.profileId);
        }
        router.push('/schedule');
      } else {
        setError(response.error || 'Failed to submit application');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-4 sm:py-6 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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

      {/* Main Content */}
      <div className="flex-1 py-8 sm:py-10 md:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Title Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Courier New, monospace' }}>
              Join our
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Courier New, monospace' }}>
              Global Talent Network
            </h3>
            <p className="text-gray-600 text-sm sm:text-base px-4">
              Share your expertise and become part of our worldwide community of professionals
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 text-white font-semibold text-sm sm:text-base">
              1
            </div>
            <div className="w-12 sm:w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 text-gray-400 font-semibold text-sm sm:text-base">
              2
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 font-semibold">
              3
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Name Fields */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 ${
                    fieldErrors.firstName 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-orange-400'
                  }`}
                />
                {fieldErrors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.firstName}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                    fieldErrors.lastName 
                      ? 'border-red-500 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-orange-400'
                  }`}
                />
                {fieldErrors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-8">
              <label className="block text-sm text-gray-700 mb-2 font-medium">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                  fieldErrors.email 
                    ? 'border-red-500 focus:ring-red-400' 
                    : 'border-gray-300 focus:ring-orange-400'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Professional Information Section */}
            <div className="mb-6">
              <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
                <CreditCard size={18} />
                <span className="font-semibold text-sm">Professional Information</span>
              </div>
              <div className="border border-t-0 border-gray-200 p-6 rounded-b-lg bg-gray-50">
                {/* Primary Expertise */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">
                    Primary Expertise*
                  </label>
                  <textarea
                    name="primaryExpertise"
                    value={formData.primaryExpertise}
                    onChange={handleChange}
                    placeholder="Describe your main professional expertise, skills, and areas of specialization..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 resize-none placeholder:text-gray-400 bg-white ${
                      fieldErrors.primaryExpertise 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-orange-400'
                    }`}
                  />
                  {fieldErrors.primaryExpertise && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.primaryExpertise}</p>
                  )}
                </div>

                {/* Additional Skills */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">
                    Additional Skills
                  </label>
                  <textarea
                    name="additionalSkills"
                    value={formData.additionalSkills}
                    onChange={handleChange}
                    placeholder="List any secondary skills, tools, technologies, or domains you're proficient in..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-900 resize-none placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Professional Profiles Section */}
            <div className="mb-6">
              <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
                <Globe size={18} />
                <span className="font-semibold text-sm">Professional Profiles</span>
              </div>
              <div className="border border-t-0 border-gray-200 p-6 rounded-b-lg bg-gray-50">
                {/* Profile URLs */}
                <div className="space-y-3 mb-4">
                  {profileUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleProfileUrlChange(index, e.target.value)}
                        placeholder="Add your profile URL (GitHub, Behance, Portfolio, etc.)"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-900 placeholder:text-gray-400 bg-white"
                      />
                      {profileUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProfileUrl(index)}
                          className="px-4 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Another Profile Button */}
                <button 
                  type="button"
                  onClick={handleAddProfileUrl}
                  className="relative w-full overflow-hidden group cursor-pointer"
                  style={{
                    height: '48px',
                    borderRadius: '8px'
                  }}
                >
                  {/* Main gradient section */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: 'linear-gradient(98.38deg, #E9414C 36.58%, #FF9634 98.09%)',
                      opacity: 0.1,
                      border: '2px solid #E9414C'
                    }}
                  ></div>
                  
                  {/* Button text */}
                  <div className="absolute inset-0 flex items-center justify-center text-red-500 font-medium text-base gap-2">
                    <span>Add another profile</span>
                    <Plus size={18} className="transform group-hover:rotate-90 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Work Preferences Section */}
            <div className="mb-8">
              <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
                <Clock size={18} />
                <span className="font-semibold text-sm">Work Preferences</span>
              </div>
              <div className="border border-t-0 border-gray-200 p-6 rounded-b-lg bg-gray-50">
                {/* Current Employment Status */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-3 font-medium">
                    Current Employment Status*
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleCurrentEmploymentStatus('full-time-employed')}
                      style={{
                        backgroundColor: formData.currentEmploymentStatus === 'full-time-employed' ? '#FFF7ED' : 'white',
                        borderColor: formData.currentEmploymentStatus === 'full-time-employed' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.currentEmploymentStatus === 'full-time-employed' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.currentEmploymentStatus === 'full-time-employed' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.currentEmploymentStatus === 'full-time-employed' ? '#C2410C' : '#374151'
                      }}>Full-time Employed</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrentEmploymentStatus('part-time-employed')}
                      style={{
                        backgroundColor: formData.currentEmploymentStatus === 'part-time-employed' ? '#FFF7ED' : 'white',
                        borderColor: formData.currentEmploymentStatus === 'part-time-employed' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.currentEmploymentStatus === 'part-time-employed' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.currentEmploymentStatus === 'part-time-employed' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.currentEmploymentStatus === 'part-time-employed' ? '#C2410C' : '#374151'
                      }}>Part-time Employed</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrentEmploymentStatus('self-employed')}
                      style={{
                        backgroundColor: formData.currentEmploymentStatus === 'self-employed' ? '#FFF7ED' : 'white',
                        borderColor: formData.currentEmploymentStatus === 'self-employed' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.currentEmploymentStatus === 'self-employed' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.currentEmploymentStatus === 'self-employed' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.currentEmploymentStatus === 'self-employed' ? '#C2410C' : '#374151'
                      }}>Self-employed / Freelancing</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrentEmploymentStatus('between-opportunities')}
                      style={{
                        backgroundColor: formData.currentEmploymentStatus === 'between-opportunities' ? '#FFF7ED' : 'white',
                        borderColor: formData.currentEmploymentStatus === 'between-opportunities' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.currentEmploymentStatus === 'between-opportunities' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.currentEmploymentStatus === 'between-opportunities' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.currentEmploymentStatus === 'between-opportunities' ? '#C2410C' : '#374151'
                      }}>Between Opportunities</span>
                    </button>
                  </div>
                  {fieldErrors.currentEmploymentStatus && (
                    <p className="text-red-600 text-sm mt-2">{fieldErrors.currentEmploymentStatus}</p>
                  )}
                </div>

                {/* Preferred Work Type */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-3 font-medium">
                    Preferred Work Type*
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handlePreferredWorkType('full-time')}
                      style={{
                        backgroundColor: formData.preferredWorkType === 'full-time' ? '#FFF7ED' : 'white',
                        borderColor: formData.preferredWorkType === 'full-time' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.preferredWorkType === 'full-time' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.preferredWorkType === 'full-time' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.preferredWorkType === 'full-time' ? '#C2410C' : '#374151'
                      }}>Full-time</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreferredWorkType('part-time')}
                      style={{
                        backgroundColor: formData.preferredWorkType === 'part-time' ? '#FFF7ED' : 'white',
                        borderColor: formData.preferredWorkType === 'part-time' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.preferredWorkType === 'part-time' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.preferredWorkType === 'part-time' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.preferredWorkType === 'part-time' ? '#C2410C' : '#374151'
                      }}>Part-time</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreferredWorkType('freelance-contract')}
                      style={{
                        backgroundColor: formData.preferredWorkType === 'freelance-contract' ? '#FFF7ED' : 'white',
                        borderColor: formData.preferredWorkType === 'freelance-contract' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.preferredWorkType === 'freelance-contract' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.preferredWorkType === 'freelance-contract' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.preferredWorkType === 'freelance-contract' ? '#C2410C' : '#374151'
                      }}>Freelance / Contract</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreferredWorkType('flexible')}
                      style={{
                        backgroundColor: formData.preferredWorkType === 'flexible' ? '#FFF7ED' : 'white',
                        borderColor: formData.preferredWorkType === 'flexible' ? '#f97316' : '#D1D5DB',
                        borderWidth: '2px',
                      }}
                      className="py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center gap-2"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          borderWidth: '2px',
                          borderColor: formData.preferredWorkType === 'flexible' ? '#f97316' : '#9CA3AF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {formData.preferredWorkType === 'flexible' && (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f97316'
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        color: formData.preferredWorkType === 'flexible' ? '#C2410C' : '#374151'
                      }}>Flexible / Open to All</span>
                    </button>
                  </div>
                  {fieldErrors.preferredWorkType && (
                    <p className="text-red-600 text-sm mt-2">{fieldErrors.preferredWorkType}</p>
                  )}
                </div>

                {/* Expected Hourly Rate */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">
                    $ Expected Hourly Rate (USD)*
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="Enter your expected rate"
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400 bg-white ${
                      fieldErrors.hourlyRate 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-gray-300 focus:ring-orange-400'
                    }`}
                  />
                  {fieldErrors.hourlyRate && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.hourlyRate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <KnackstersButton
              text={loading ? "Submitting..." : "Next: Schedule Meet & Greet"}
              fullWidth={true}
              onClick={handleNext}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <OnboardingFooter />
    </div>
  );
}

