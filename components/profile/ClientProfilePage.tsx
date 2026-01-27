'use client'

import React, { useState, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar,
  Save,
  Pencil,
  Camera,
  CheckCircle,
  X
} from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import Image from 'next/image'

export default function ClientProfilePage() {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    location: '',
    bio: '',
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        company: (user as any).company || '',
        jobTitle: (user as any).jobTitle || '',
        location: (user as any).location || '',
        bio: (user as any).bio || '',
      })
    }
  }, [user])

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setIsEditing(false)
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const handleCancel = () => {
    // Reset to original user data
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        company: (user as any).company || '',
        jobTitle: (user as any).jobTitle || '',
        location: (user as any).location || '',
        bio: (user as any).bio || '',
      })
    }
    setIsEditing(false)
  }

  const memberSince = (user as any)?.createdAt 
    ? new Date((user as any).createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A'

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3 self-start sm:self-auto">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">Profile updated successfully!</p>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">
                  {getInitials(profileData.fullName)}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#FF9634] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E88530] transition-colors border-4 border-white">
                  <Camera size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Calendar size={16} />
            <span>Member since {memberSince}</span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={true}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="(555) 123-4567"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <div className="relative">
                <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={profileData.company}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Your Company Inc."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <div className="relative">
                <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="jobTitle"
                  value={profileData.jobTitle}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="CEO, CTO, etc."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="City, State/Country"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell us a bit about yourself and your business..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">Account ID</span>
            <span className="text-sm font-mono text-gray-900">{user?.id?.substring(0, 8) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">Account Type</span>
            <span className="text-sm font-semibold text-gray-900">Client</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">Status</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
