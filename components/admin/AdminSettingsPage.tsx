'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Lock,
  Loader2,
} from 'lucide-react'
import { userApi } from '@/lib/api/client'

export default function AdminSettingsPage() {
  const router = useRouter()

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    setPasswordError('')
  }

  const handleChangePassword = async () => {
    setPasswordError('')
    if (!passwordForm.currentPassword) return setPasswordError('Please enter your current password')
    if (passwordForm.newPassword.length < 8) return setPasswordError('New password must be at least 8 characters')
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return setPasswordError('New passwords do not match')
    if (passwordForm.newPassword === passwordForm.currentPassword) return setPasswordError('New password must differ from current password')

    setPasswordSaving(true)
    try {
      const res = await userApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      if (res.success) {
        setPasswordSuccess('Password changed successfully!')
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => setPasswordSuccess(''), 5000)
      } else {
        setPasswordError((res as any).error || 'Failed to change password')
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password')
    } finally {
      setPasswordSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <button
        onClick={() => router.push('/admin-dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your administrator account security</p>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <Shield size={18} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Password & Security</h2>
            <p className="text-xs text-gray-500">Change your administrator password</p>
          </div>
        </div>

        {passwordSuccess && (
          <div className="mb-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">{passwordSuccess}</p>
          </div>
        )}
        {passwordError && (
          <div className="mb-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{passwordError}</p>
          </div>
        )}

        <div className="space-y-4">
          {[
            { label: 'Current Password', name: 'currentPassword', show: showCurrent, toggle: () => setShowCurrent(v => !v) },
            { label: 'New Password', name: 'newPassword', show: showNew, toggle: () => setShowNew(v => !v) },
            { label: 'Confirm New Password', name: 'confirmPassword', show: showConfirm, toggle: () => setShowConfirm(v => !v) },
          ].map(({ label, name, show, toggle }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={show ? 'text' : 'password'}
                  name={name}
                  value={passwordForm[name as keyof typeof passwordForm]}
                  onChange={handlePasswordChange}
                  disabled={passwordSaving}
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E9414C] disabled:bg-gray-50"
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={handleChangePassword}
            disabled={passwordSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E9414C] text-white font-semibold rounded-lg hover:bg-[#D03841] disabled:opacity-50 text-sm transition-colors"
          >
            {passwordSaving ? <Loader2 size={15} className="animate-spin" /> : <Shield size={15} />}
            {passwordSaving ? 'Changing Password…' : 'Change Password'}
          </button>
        </div>
      </div>
    </div>
  )
}
