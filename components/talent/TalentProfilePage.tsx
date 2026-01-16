'use client'

import React, { useState } from 'react'
import TalentPageWrapper from './TalentPageWrapper'
import { 
  User, 
  Mail, 
  Phone,
  Globe,
  DollarSign,
  Clock,
  Briefcase,
  Save,
  Plus
} from 'lucide-react'

export default function TalentProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Anderson',
    email: 'alex.anderson@email.com',
    phone: '+1 (555) 234-5678',
    bio: 'Experienced full-stack developer with 8+ years in web and mobile development. Specialized in React, Node.js, and cloud architecture.',
    expertise: 'Full-Stack Development, UI/UX Design, Cloud Architecture',
    skills: 'React, Node.js, TypeScript, Python, AWS, Docker, PostgreSQL',
    portfolioUrl: 'https://github.com/alexanderson',
    linkedinUrl: 'https://linkedin.com/in/alexanderson',
    currentEmploymentStatus: 'self-employed',
    preferredWorkType: 'freelance-contract',
    hourlyRate: '85',
    availability: '30'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    console.log('Profile updated:', profileData)
  }

  return (
    <TalentPageWrapper>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
              <p className="text-gray-600">Manage your professional profile and preferences</p>
            </div>

            {/* Profile Photo */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Photo</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <User size={48} className="text-white" />
                </div>
                <div>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors mb-2">
                    Upload New Photo
                  </button>
                  <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size of 2MB</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email*
                    </label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={20} className="text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Professional Information</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Expertise
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={profileData.expertise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <textarea
                    name="skills"
                    value={profileData.skills}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Separate skills with commas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Profiles */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Professional Profiles</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio / GitHub URL
                  </label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={profileData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={profileData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <button className="w-full py-3 border-2 border-orange-400 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} />
                  Add Another Profile
                </button>
              </div>
            </div>

            {/* Work Preferences */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Work Preferences</h2>
              </div>

              <div className="space-y-6">
                {/* Current Employment Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current Employment Status
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setProfileData({...profileData, currentEmploymentStatus: 'full-time-employed'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.currentEmploymentStatus === 'full-time-employed'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.currentEmploymentStatus === 'full-time-employed' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.currentEmploymentStatus === 'full-time-employed' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Full-time Employed</span>
                    </button>
                    
                    <button
                      onClick={() => setProfileData({...profileData, currentEmploymentStatus: 'part-time-employed'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.currentEmploymentStatus === 'part-time-employed'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.currentEmploymentStatus === 'part-time-employed' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.currentEmploymentStatus === 'part-time-employed' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Part-time Employed</span>
                    </button>
                    
                    <button
                      onClick={() => setProfileData({...profileData, currentEmploymentStatus: 'self-employed'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.currentEmploymentStatus === 'self-employed'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.currentEmploymentStatus === 'self-employed' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.currentEmploymentStatus === 'self-employed' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Self-employed / Freelancing</span>
                    </button>
                    
                    <button
                      onClick={() => setProfileData({...profileData, currentEmploymentStatus: 'between-opportunities'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.currentEmploymentStatus === 'between-opportunities'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.currentEmploymentStatus === 'between-opportunities' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.currentEmploymentStatus === 'between-opportunities' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Between Opportunities</span>
                    </button>
                  </div>
                </div>

                {/* Preferred Work Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Work Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setProfileData({...profileData, preferredWorkType: 'full-time'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.preferredWorkType === 'full-time'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.preferredWorkType === 'full-time' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.preferredWorkType === 'full-time' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Full-time</span>
                    </button>
                    
                    <button
                      onClick={() => setProfileData({...profileData, preferredWorkType: 'part-time'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.preferredWorkType === 'part-time'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.preferredWorkType === 'part-time' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.preferredWorkType === 'part-time' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Part-time</span>
                    </button>
                    
                    <button
                      onClick={() => setProfileData({...profileData, preferredWorkType: 'freelance-contract'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.preferredWorkType === 'freelance-contract'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.preferredWorkType === 'freelance-contract' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.preferredWorkType === 'freelance-contract' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Freelance / Contract</span>
                    </button>
                    
                    <button
                      onClick={() => setProfileData({...profileData, preferredWorkType: 'flexible'})}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-colors text-left flex items-center gap-2 ${
                        profileData.preferredWorkType === 'flexible'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        profileData.preferredWorkType === 'flexible' ? 'border-orange-500' : 'border-gray-400'
                      }`}>
                        {profileData.preferredWorkType === 'flexible' && (
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      <span>Flexible / Open to All</span>
                    </button>
                  </div>
                </div>

                {/* Hourly Rate and Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (USD)
                    </label>
                    <div className="relative">
                      <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="hourlyRate"
                        value={profileData.hourlyRate}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hours Available / Week
                    </label>
                    <input
                      type="number"
                      name="availability"
                      value={profileData.availability}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all flex items-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
      </div>
    </TalentPageWrapper>
  )
}

