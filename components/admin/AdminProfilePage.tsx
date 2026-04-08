'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Shield,
  Save,
  Pencil,
  Camera,
  CheckCircle,
  X,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Loader2,
} from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { getInitials } from '@/lib/utils/image'
import Image from 'next/image'

export default function AdminProfilePage() {
  const router = useRouter()
  const { user, updateProfile, uploadAvatar, removeAvatar } = useUser()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    fullName: user?.fullName || '',
  })

  // Avatar
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [avatarUploading, setAvatarUploading] = useState(false)

  const memberSince = (user as any)?.createdAt
    ? new Date((user as any).createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    setForm({ fullName: user?.fullName || '' })
    setIsEditing(true)
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(null)
    setPendingFile(null)
  }

  const handleSave = async () => {
    if (!form.fullName.trim()) return setError('Full name is required')
    setIsSaving(true)
    setError('')
    try {
      await updateProfile({ fullName: form.fullName.trim() })
      setIsEditing(false)
      setSuccess('Profile updated!')
      setTimeout(() => setSuccess(''), 4000)
    } catch (err: any) {
      setError(err.message || 'Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(URL.createObjectURL(file))
    setPendingFile(file)
  }

  const handleUploadAvatar = async () => {
    if (!pendingFile) return
    setAvatarUploading(true)
    setError('')
    try {
      await uploadAvatar(pendingFile)
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
      setAvatarPreview(null)
      setPendingFile(null)
      setSuccess('Photo updated!')
      setTimeout(() => setSuccess(''), 4000)
    } catch (err: any) {
      setError(err.message || 'Failed to upload photo')
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleRemoveAvatar = async () => {
    setAvatarUploading(true)
    setError('')
    try {
      await removeAvatar()
      setSuccess('Photo removed.')
      setTimeout(() => setSuccess(''), 4000)
    } catch (err: any) {
      setError(err.message || 'Failed to remove photo')
    } finally {
      setAvatarUploading(false)
    }
  }

  const displayAvatar = avatarPreview ?? user?.avatarUrl

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your administrator account details</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E9414C] text-white font-semibold rounded-lg hover:bg-[#D03841] transition-colors self-start sm:self-auto"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3 self-start sm:self-auto">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E9414C] text-white font-semibold rounded-lg hover:bg-[#D03841] transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Alerts */}
      {success && (
        <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}
      {error && (
        <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
          <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Profile card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-[#E9414C] to-[#c0392b]" />

        <div className="px-6 pb-6">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 mb-5">
            <div className="relative inline-block flex-shrink-0">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-red-400 to-red-700 flex items-center justify-center">
                {displayAvatar ? (
                  <Image src={displayAvatar} alt="Avatar" width={112} height={112} className="object-cover w-full h-full" unoptimized />
                ) : (
                  <span className="text-white text-2xl font-bold">{getInitials(user?.fullName)}</span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="absolute bottom-0 right-0 w-9 h-9 bg-[#E9414C] text-white rounded-full border-2 border-white flex items-center justify-center shadow hover:bg-[#D03841] transition-colors disabled:opacity-50"
                title="Change photo"
              >
                <Camera size={15} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleFileSelect} />
            </div>

            {pendingFile ? (
              <div className="flex gap-2 pb-1">
                <button
                  onClick={handleUploadAvatar}
                  disabled={avatarUploading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#E9414C] text-white text-sm font-semibold rounded-lg hover:bg-[#D03841] disabled:opacity-50 transition-colors"
                >
                  {avatarUploading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {avatarUploading ? 'Saving…' : 'Save photo'}
                </button>
                <button
                  onClick={() => { if (avatarPreview) URL.revokeObjectURL(avatarPreview); setAvatarPreview(null); setPendingFile(null) }}
                  disabled={avatarUploading}
                  className="px-4 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Discard
                </button>
              </div>
            ) : user?.avatarUrl ? (
              <button
                onClick={handleRemoveAvatar}
                disabled={avatarUploading}
                className="pb-1 text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                Remove photo
              </button>
            ) : null}
          </div>

          {/* Admin badge + member since */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-red-700">
              <Shield size={11} />
              Administrator
            </span>
            {memberSince && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={12} />
                Member since {memberSince}
              </span>
            )}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="fullName"
                  value={isEditing ? form.fullName : (user?.fullName || '')}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E9414C] disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
