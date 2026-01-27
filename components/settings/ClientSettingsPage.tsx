'use client'

import React, { useState } from 'react'
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Eye, 
  EyeOff,
  Save,
  CheckCircle,
  Lock,
  Globe,
  Clock
} from 'lucide-react'

export default function ClientSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [notifications, setNotifications] = useState({
    emailProjectUpdates: true,
    emailTaskAssignments: true,
    emailMeetingReminders: true,
    emailWeeklyReports: true,
    emailBillingNotices: true,
    pushNotifications: false,
    smsReminders: false,
  })

  const [preferences, setPreferences] = useState({
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'en',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    })
  }

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setShowSuccess(true)
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your account preferences and security</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">Settings saved successfully!</p>
          </div>
        </div>
      )}

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Bell size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
            <p className="text-sm text-gray-600">Choose how you want to be notified</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-900">Email Notifications</h3>
            </div>
            <div className="space-y-3 ml-6">
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Project updates and status changes</span>
                <input
                  type="checkbox"
                  checked={notifications.emailProjectUpdates}
                  onChange={() => handleNotificationChange('emailProjectUpdates')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">New task assignments</span>
                <input
                  type="checkbox"
                  checked={notifications.emailTaskAssignments}
                  onChange={() => handleNotificationChange('emailTaskAssignments')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Meeting reminders</span>
                <input
                  type="checkbox"
                  checked={notifications.emailMeetingReminders}
                  onChange={() => handleNotificationChange('emailMeetingReminders')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Weekly progress reports</span>
                <input
                  type="checkbox"
                  checked={notifications.emailWeeklyReports}
                  onChange={() => handleNotificationChange('emailWeeklyReports')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Billing and payment notices</span>
                <input
                  type="checkbox"
                  checked={notifications.emailBillingNotices}
                  onChange={() => handleNotificationChange('emailBillingNotices')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
            </div>
          </div>

          {/* Other Notifications */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={16} className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-900">Other Notifications</h3>
            </div>
            <div className="space-y-3 ml-6">
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Push notifications (browser)</span>
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={() => handleNotificationChange('pushNotifications')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
              <label className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">SMS reminders for meetings</span>
                <input
                  type="checkbox"
                  checked={notifications.smsReminders}
                  onChange={() => handleNotificationChange('smsReminders')}
                  className="w-5 h-5 text-[#FF9634] rounded focus:ring-2 focus:ring-[#FF9634]"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <Globe size={20} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Display Preferences</h2>
            <p className="text-sm text-gray-600">Customize your experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                Timezone
              </div>
            </label>
            <select
              name="timezone"
              value={preferences.timezone}
              onChange={handlePreferenceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent bg-white"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                Date Format
              </div>
            </label>
            <select
              name="dateFormat"
              value={preferences.dateFormat}
              onChange={handlePreferenceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent bg-white"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (01/24/2026)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (24/01/2026)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2026-01-24)</option>
            </select>
          </div>

          {/* Time Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                Time Format
              </div>
            </label>
            <select
              name="timeFormat"
              value={preferences.timeFormat}
              onChange={handlePreferenceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent bg-white"
            >
              <option value="12h">12-hour (2:30 PM)</option>
              <option value="24h">24-hour (14:30)</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-gray-500" />
                Language
              </div>
            </label>
            <select
              name="language"
              value={preferences.language}
              onChange={handlePreferenceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent bg-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#FF9634] text-white font-semibold rounded-lg hover:bg-[#E88530] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <Shield size={20} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Security</h2>
            <p className="text-sm text-gray-600">Manage your password and security settings</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9634] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleChangePassword}
            disabled={isSaving || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
            className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Lock size={18} />
            {isSaving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  )
}
