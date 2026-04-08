'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import TalentPageWrapper from './TalentPageWrapper'
import {
  User,
  Mail,
  Phone,
  Globe,
  Clock,
  Briefcase,
  Save,
  X,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Camera,
  Linkedin,
  Link,
  ArrowLeft,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { talentApi } from '@/lib/api/client'

const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Toronto',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Amsterdam',
  'Africa/Lagos',
  'Africa/Nairobi',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
]

function ProfileCompletionBar({ profile }: { profile: any }) {
  const fields = [
    profile?.bio,
    profile?.skills?.length > 0,
    profile?.timezone,
    profile?.weeklyCapacityHours,
    profile?.portfolioUrl || profile?.linkedinUrl,
    profile?.phone,
  ]
  const filled = fields.filter(Boolean).length
  const pct = Math.round((filled / fields.length) * 100)
  const color = pct < 40 ? 'bg-red-400' : pct < 80 ? 'bg-yellow-400' : 'bg-green-500'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Profile completeness</span>
        <span className="text-sm font-bold text-gray-900">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`h-2 rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      {pct < 100 && (
        <p className="text-xs text-gray-400 mt-2">
          Complete your profile so managers can match you to the right tasks.
        </p>
      )}
    </div>
  )
}

// ─── Skill Tag Input ─────────────────────────────────────────────────────────

function SkillTagInput({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [input, setInput] = useState('')

  const addSkill = () => {
    const trimmed = input.trim()
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed])
    }
    setInput('')
  }

  const removeSkill = (skill: string) => onChange(skills.filter((s) => s !== skill))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill()
    }
    if (e.key === 'Backspace' && input === '' && skills.length > 0) {
      removeSkill(skills[skills.length - 1])
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent min-h-[48px] flex flex-wrap gap-2 items-center">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-sm px-2.5 py-1 rounded-full font-medium"
        >
          {skill}
          <button
            type="button"
            onClick={() => removeSkill(skill)}
            className="text-orange-500 hover:text-orange-700 transition-colors"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (input.trim()) addSkill() }}
        placeholder={skills.length === 0 ? 'Type a skill and press Enter…' : ''}
        className="flex-1 min-w-[140px] outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TalentProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    skills: [] as string[],
    timezone: '',
    weeklyCapacityHours: '',
    portfolioUrl: '',
    linkedinUrl: '',
  })

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null)

  const [rawProfile, setRawProfile] = useState<any>(null)

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true)
      const res = await talentApi.getProfile()
      const p = res.data?.profile
      if (p) {
        setRawProfile(p)
        setCurrentAvatarUrl(p.avatarUrl ?? null)
        setForm({
          firstName: p.firstName ?? '',
          lastName: p.lastName ?? '',
          email: p.email ?? '',
          phone: p.phone ?? '',
          bio: p.bio ?? '',
          skills: p.skills ?? [],
          timezone: p.timezone ?? '',
          weeklyCapacityHours: p.weeklyCapacityHours?.toString() ?? '',
          portfolioUrl: p.portfolioUrl ?? '',
          linkedinUrl: p.linkedinUrl ?? '',
        })
      }
    } catch {
      setErrorMsg('Failed to load your profile. Please refresh.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadProfile() }, [loadProfile])

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const url = URL.createObjectURL(file)
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(url)
    setAvatarBlob(file)
  }

  const handleUploadAvatar = async () => {
    if (!avatarBlob) return
    setAvatarUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', avatarBlob)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
      const res = await fetch(`${API_URL}/api/talent/avatar`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setCurrentAvatarUrl(data.data?.avatarUrl ?? null)
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
      setAvatarPreview(null)
      setAvatarBlob(null)
      setSuccessMsg('Photo updated!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to upload photo')
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMsg('')
    setErrorMsg('')
    try {
      await talentApi.updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        bio: form.bio,
        skills: form.skills,
        timezone: form.timezone,
        weeklyCapacityHours: form.weeklyCapacityHours ? parseInt(form.weeklyCapacityHours) : null,
        portfolioUrl: form.portfolioUrl,
        linkedinUrl: form.linkedinUrl,
      })
      setSuccessMsg('Profile saved successfully!')
      await loadProfile()
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const getInitials = () => {
    const name = `${form.firstName} ${form.lastName}`.trim()
    return name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : 'T'
  }

  if (loading) {
    return (
      <TalentPageWrapper>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="animate-spin text-orange-500" size={40} />
        </div>
      </TalentPageWrapper>
    )
  }

  return (
    <TalentPageWrapper>
      <button
        onClick={() => router.push('/talent-dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">
          Your profile is visible to your Customer Success Manager when they assign tasks.
        </p>
      </div>

      {/* Completion bar */}
      <ProfileCompletionBar profile={{ ...form, skills: form.skills, weeklyCapacityHours: form.weeklyCapacityHours || null }} />

      {/* Success / Error banners */}
      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 mb-6">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 mb-6">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span className="text-sm font-medium">{errorMsg}</span>
          <button onClick={() => setErrorMsg('')} className="ml-auto text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">

        {/* Profile Photo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-400 to-orange-600">
              {(avatarPreview ?? currentAvatarUrl) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview ?? currentAvatarUrl!} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{getInitials()}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {avatarBlob ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleUploadAvatar}
                    disabled={avatarUploading}
                    className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-700 disabled:opacity-60 transition-colors"
                  >
                    {avatarUploading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {avatarUploading ? 'Saving…' : 'Save photo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (avatarPreview) URL.revokeObjectURL(avatarPreview); setAvatarPreview(null); setAvatarBlob(null) }}
                    disabled={avatarUploading}
                    className="px-4 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors"
                  >
                    Discard
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Camera size={16} />
                  {currentAvatarUrl ? 'Change photo' : 'Upload photo'}
                </button>
              )}
              <p className="text-xs text-gray-400">JPG, PNG or WebP. Max 5 MB.</p>
            </div>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarSelect}
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Email can't be changed here</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Professional Bio
                <span className="ml-1 text-gray-400 font-normal">(shown to your CSM)</span>
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                maxLength={600}
                placeholder="A short description of your background, what you do best, and what kinds of work you enjoy…"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none text-sm"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">{form.bio.length}/600</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase size={20} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Skills & Expertise</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Skills
              <span className="ml-1 text-gray-400 font-normal">(press Enter or comma to add)</span>
            </label>
            <SkillTagInput skills={form.skills} onChange={(s) => setForm({ ...form, skills: s })} />
            {form.skills.length === 0 && (
              <p className="text-xs text-gray-400 mt-1.5">
                e.g. React, TypeScript, Figma, Python, AWS…
              </p>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-orange-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Availability</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
              <select
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              >
                <option value="">Select timezone…</option>
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Hours available / week
              </label>
              <input
                type="number"
                min={1}
                max={80}
                value={form.weeklyCapacityHours}
                onChange={(e) => setForm({ ...form, weeklyCapacityHours: e.target.value })}
                placeholder="e.g. 20"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Professional Profiles</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Portfolio / GitHub URL
              </label>
              <div className="relative">
                <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={form.portfolioUrl}
                  onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                  placeholder="https://github.com/yourname"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                LinkedIn URL
              </label>
              <div className="relative">
                <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pb-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 disabled:opacity-60 transition-all"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

      </form>
    </TalentPageWrapper>
  )
}
