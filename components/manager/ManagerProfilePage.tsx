'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Camera, Trash2, Check, AlertCircle, User, Mail, Briefcase, Users, ArrowLeft } from 'lucide-react'
import { managerApi } from '@/lib/api/client'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { cropToSquare } from '@/lib/utils/image'

interface ManagerProfile {
  id: string
  email: string
  fullName: string
  firstName?: string
  lastName?: string
  avatarUrl?: string | null
  specializations: string[]
  status: string
  createdAt: string
  _count: { managedClients: number }
}

const SPECIALIZATION_LABELS: Record<string, string> = {
  AI_MACHINE_LEARNING: 'AI & Machine Learning',
  CYBERSECURITY: 'Cybersecurity',
  SOFTWARE_DEVELOPMENT: 'Software Development',
  DESIGN_CREATIVE: 'Design & Creative',
  MARKETING_GROWTH: 'Marketing & Growth',
  HEALTHCARE_LIFE_SCIENCES: 'Healthcare & Life Sciences',
  MULTIPLE: 'Multiple',
  OTHER: 'Other',
}


export default function ManagerProfilePage() {
  const { user, refresh: refreshUser } = useUser()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<ManagerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await managerApi.getProfile()
      if (res.success && res.data?.manager) {
        setProfile(res.data.manager)
      }
    } catch (err: any) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  // Clean up object URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so the same file can be reselected if needed
    e.target.value = ''
    setError('')
    setSuccess('')

    try {
      const blob = await cropToSquare(file)
      const url = URL.createObjectURL(blob)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(url)
      setPendingBlob(blob)
    } catch (err: any) {
      setError('Could not process image. Please try a different file.')
    }
  }

  const handleSavePhoto = async () => {
    if (!pendingBlob) return
    setError('')
    setSuccess('')
    setUploading(true)

    try {
      const res = await managerApi.uploadAvatar(pendingBlob)
      if (res.success && res.data?.avatarUrl) {
        setProfile((prev) => prev ? { ...prev, avatarUrl: res.data.avatarUrl } : prev)
        setPreviewUrl(null)
        setPendingBlob(null)
        setSuccess('Profile photo updated successfully.')
        await refreshUser()
      } else {
        throw new Error(res.error || 'Upload failed')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save photo. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDiscard = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setPendingBlob(null)
    setError('')
  }

  const handleRemovePhoto = async () => {
    if (!profile?.avatarUrl) return
    setError('')
    setSuccess('')
    setRemoving(true)

    try {
      await managerApi.removeAvatar()
      setProfile((prev) => prev ? { ...prev, avatarUrl: null } : prev)
      setSuccess('Profile photo removed.')
      await refreshUser()
    } catch (err: any) {
      setError(err.message || 'Failed to remove photo.')
    } finally {
      setRemoving(false)
    }
  }

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const displayAvatarUrl = previewUrl ?? profile?.avatarUrl ?? null

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-24 text-gray-500">Failed to load profile.</div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/manager-dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage how clients see you on their dashboard
        </p>
      </div>

      {/* Alerts */}
      {success && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="ml-auto text-green-600 hover:text-green-700 text-xs font-medium">
            Dismiss
          </button>
        </div>
      )}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-700 text-xs font-medium">
            Dismiss
          </button>
        </div>
      )}

      {/* Profile photo card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Profile Photo</h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-md">
              {displayAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayAvatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {getInitials(profile.fullName)}
                  </span>
                </div>
              )}
            </div>
            {/* Pending badge */}
            {previewUrl && (
              <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1 shadow">
                <Camera className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-4">
            {previewUrl ? (
              /* Pending state — user has selected but not saved */
              <div className="space-y-3">
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Preview ready. Save to apply this photo to your profile.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleSavePhoto}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-60 transition-colors"
                  >
                    {uploading ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    {uploading ? 'Saving…' : 'Save Photo'}
                  </button>
                  <button
                    onClick={handleDiscard}
                    disabled={uploading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors"
                  >
                    Discard
                  </button>
                </div>
              </div>
            ) : (
              /* Default state */
              <div className="space-y-3">
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    {profile.avatarUrl ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG or WebP · Max 5 MB · Will be auto-cropped to a square
                  </p>
                </div>
                {profile.avatarUrl && (
                  <button
                    onClick={handleRemovePhoto}
                    disabled={removing}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors disabled:opacity-60"
                  >
                    <Trash2 className="w-4 h-4" />
                    {removing ? 'Removing…' : 'Remove photo'}
                  </button>
                )}
              </div>
            )}

            <p className="text-xs text-gray-400 leading-relaxed">
              This photo is shown to clients on their dashboard next to your name.
              Use a professional headshot with a clear background.
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Profile info card (read-only) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Profile Information</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Full name</p>
              <p className="text-sm font-medium text-gray-900">{profile.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Clients assigned</p>
              <p className="text-sm font-medium text-gray-900">
                {profile._count.managedClients}{' '}
                {profile._count.managedClients === 1 ? 'client' : 'clients'}
              </p>
            </div>
          </div>

          {profile.specializations.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {SPECIALIZATION_LABELS[s] ?? s.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs text-gray-400">
          To update your name or specializations, contact your admin.
        </p>
      </div>
    </div>
  )
}
