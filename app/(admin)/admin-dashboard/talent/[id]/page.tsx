'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  UserCheck,
  Mail,
  DollarSign,
  Briefcase,
  Clock,
  ExternalLink,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
  MapPin,
  Globe,
  Linkedin,
  Edit2,
  Save,
  X,
  Link as LinkIcon,
  BadgeCheck,
  User,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { adminApi } from '@/lib/api/client';

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Vancouver', 'America/Toronto', 'America/Sao_Paulo', 'Europe/London',
  'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam', 'Europe/Madrid', 'Europe/Rome',
  'Europe/Stockholm', 'Europe/Warsaw', 'Africa/Lagos', 'Africa/Nairobi',
  'Africa/Johannesburg', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore',
  'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney', 'Pacific/Auckland',
];

interface UserEnrichment {
  id: string;
  avatarUrl?: string | null;
  bio?: string | null;
  skills: string[];
  timezone?: string | null;
  weeklyCapacityHours?: number | null;
  portfolioUrl?: string | null;
  linkedinUrl?: string | null;
}

interface TalentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryExpertise: string;
  additionalSkills?: string;
  currentEmploymentStatus: string;
  preferredWorkType: string;
  hourlyRate: number;
  status: string;
  createdAt: string;
  profileUrls?: string[];
  preferredMeetingTime?: string;
  meetingNotes?: string;
  meetingLink?: string;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  userId?: string | null;
  user?: UserEnrichment | null;
}

interface EnrichmentForm {
  bio: string;
  skills: string[];
  timezone: string;
  weeklyCapacityHours: string;
  portfolioUrl: string;
  linkedinUrl: string;
}

function SkillTagInput({
  skills,
  onChange,
}: {
  skills: string[];
  onChange: (skills: string[]) => void;
}) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const val = input.trim();
    if (val && !skills.includes(val)) onChange([...skills, val]);
    setInput('');
  };

  const removeSkill = (idx: number) => onChange(skills.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {skills.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
          >
            {s}
            <button onClick={() => removeSkill(i)} className="hover:text-purple-900">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="Type a skill and press Enter"
          className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSkill}
          type="button"
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function TalentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const talentId = params.id as string;

  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Enrichment edit state
  const [editingEnrichment, setEditingEnrichment] = useState(false);
  const [enrichmentForm, setEnrichmentForm] = useState<EnrichmentForm>({
    bio: '',
    skills: [],
    timezone: '',
    weeklyCapacityHours: '',
    portfolioUrl: '',
    linkedinUrl: '',
  });
  const [enrichmentSaving, setEnrichmentSaving] = useState(false);
  const [enrichmentMessage, setEnrichmentMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await adminApi.getTalentApplication(talentId);
        if (data.success) {
          setProfile(data.data);
          if (data.data.user) {
            const u: UserEnrichment = data.data.user;
            setEnrichmentForm({
              bio: u.bio || '',
              skills: u.skills || [],
              timezone: u.timezone || '',
              weeklyCapacityHours: u.weeklyCapacityHours ? String(u.weeklyCapacityHours) : '',
              portfolioUrl: u.portfolioUrl || '',
              linkedinUrl: u.linkedinUrl || '',
            });
          }
        } else {
          router.push('/admin-dashboard/talent');
        }
      } catch (error: any) {
        console.error('Failed to fetch talent profile:', error);
        if (error.message?.includes('404')) {
          router.push('/admin-dashboard/talent');
        }
      } finally {
        setLoading(false);
      }
    }

    if (talentId) fetchProfile();
  }, [talentId, router]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!profile) return;
    setActionLoading(true);
    try {
      const data = await adminApi.updateTalentStatus(talentId, newStatus);
      if (data.success) {
        setProfile(data.data);
      }
    } catch {
      alert('Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveEnrichment = async () => {
    setEnrichmentSaving(true);
    setEnrichmentMessage(null);
    try {
      const payload = {
        bio: enrichmentForm.bio || undefined,
        skills: enrichmentForm.skills,
        timezone: enrichmentForm.timezone || undefined,
        weeklyCapacityHours: enrichmentForm.weeklyCapacityHours
          ? parseInt(enrichmentForm.weeklyCapacityHours)
          : null,
        portfolioUrl: enrichmentForm.portfolioUrl || undefined,
        linkedinUrl: enrichmentForm.linkedinUrl || undefined,
      };
      const res = await adminApi.updateTalentUserProfile(talentId, payload);
      if (res.success) {
        setProfile(prev =>
          prev
            ? {
                ...prev,
                user: { ...(prev.user as UserEnrichment), ...res.data.userProfile },
              }
            : prev
        );
        setEditingEnrichment(false);
        setEnrichmentMessage({ type: 'success', text: 'Profile updated successfully.' });
        setTimeout(() => setEnrichmentMessage(null), 3000);
      }
    } catch (err: any) {
      setEnrichmentMessage({
        type: 'error',
        text: err.message || 'Failed to save profile.',
      });
    } finally {
      setEnrichmentSaving(false);
    }
  };

  const handleCancelEnrichment = () => {
    if (profile?.user) {
      const u = profile.user;
      setEnrichmentForm({
        bio: u.bio || '',
        skills: u.skills || [],
        timezone: u.timezone || '',
        weeklyCapacityHours: u.weeklyCapacityHours ? String(u.weeklyCapacityHours) : '',
        portfolioUrl: u.portfolioUrl || '',
        linkedinUrl: u.linkedinUrl || '',
      });
    }
    setEditingEnrichment(false);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_REVIEW': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'INTERVIEW_SCHEDULED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'APPROVED': return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatStatus = (status: string) =>
    status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <UserCheck size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-900 mb-1">Profile not found</p>
          <Link href="/admin-dashboard/talent" className="text-sm text-blue-600 hover:text-blue-700">
            ← Back to applications
          </Link>
        </div>
      </div>
    );
  }

  const enrichment = profile.user;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Back */}
      <Link
        href="/admin-dashboard/talent"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} />
        Back to applications
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {enrichment?.avatarUrl ? (
              <Image
                src={enrichment.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-gray-500 text-sm">{profile.primaryExpertise}</p>
              {profile.userId && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs text-green-600 font-medium">
                  <BadgeCheck size={13} />
                  Active platform user
                </span>
              )}
            </div>
          </div>
          <span className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${getStatusColor(profile.status)}`}>
            {formatStatus(profile.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} className="text-gray-400" />
            {profile.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign size={16} className="text-gray-400" />
            ${profile.hourlyRate}/hour
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400" />
            Applied {formatDate(profile.createdAt)}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {profile.status === 'PENDING_REVIEW' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleStatusUpdate('APPROVED')}
              disabled={actionLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <CheckCircle size={20} />
              Approve Application
            </button>
            <button
              onClick={() => handleStatusUpdate('REJECTED')}
              disabled={actionLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <XCircle size={20} />
              Reject Application
            </button>
          </div>
        </div>
      )}

      {/* Application Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Preferences</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Employment Status</p>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gray-400" />
                <p className="text-sm font-medium text-gray-900">
                  {profile.currentEmploymentStatus.replace(/_/g, ' ')}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Preferred Work Type</p>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <p className="text-sm font-medium text-gray-900">
                  {profile.preferredWorkType.replace(/_/g, ' ')}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-gray-400" />
                <p className="text-sm font-medium text-gray-900">${profile.hourlyRate}/hour</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Primary Expertise</p>
              <p className="text-sm font-medium text-gray-900">{profile.primaryExpertise}</p>
            </div>
            {profile.additionalSkills && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Additional Skills</p>
                <p className="text-sm text-gray-700">{profile.additionalSkills}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio Links from Application */}
      {profile.profileUrls && profile.profileUrls.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio & Links (Application)</h2>
          <div className="space-y-2">
            {profile.profileUrls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <ExternalLink size={14} />
                {url}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Platform Profile Enrichment */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Platform Profile</h2>
          </div>
          {enrichment && !editingEnrichment && (
            <button
              onClick={() => setEditingEnrichment(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Edit2 size={14} />
              Edit
            </button>
          )}
        </div>

        {enrichmentMessage && (
          <div
            className={`mb-4 px-4 py-2.5 rounded-lg text-sm font-medium ${
              enrichmentMessage.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {enrichmentMessage.text}
          </div>
        )}

        {!enrichment ? (
          <div className="text-center py-6 text-gray-400">
            <User size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">
              This applicant doesn't have a platform account yet.
              <br />
              Platform profile fields become editable once they're approved and their account is created.
            </p>
          </div>
        ) : editingEnrichment ? (
          <div className="space-y-5">
            {/* Bio */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={enrichmentForm.bio}
                onChange={e => setEnrichmentForm(f => ({ ...f, bio: e.target.value }))}
                rows={3}
                maxLength={500}
                placeholder="Short professional summary…"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">{enrichmentForm.bio.length}/500</p>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Skills</label>
              <SkillTagInput
                skills={enrichmentForm.skills}
                onChange={s => setEnrichmentForm(f => ({ ...f, skills: s }))}
              />
            </div>

            {/* Timezone + Weekly Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={enrichmentForm.timezone}
                  onChange={e => setEnrichmentForm(f => ({ ...f, timezone: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select timezone</option>
                  {TIMEZONES.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Weekly Capacity (hours)</label>
                <input
                  type="number"
                  min={1}
                  max={80}
                  value={enrichmentForm.weeklyCapacityHours}
                  onChange={e => setEnrichmentForm(f => ({ ...f, weeklyCapacityHours: e.target.value }))}
                  placeholder="e.g. 20"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Portfolio URL + LinkedIn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Portfolio URL</label>
                <input
                  type="url"
                  value={enrichmentForm.portfolioUrl}
                  onChange={e => setEnrichmentForm(f => ({ ...f, portfolioUrl: e.target.value }))}
                  placeholder="https://portfolio.example.com"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={enrichmentForm.linkedinUrl}
                  onChange={e => setEnrichmentForm(f => ({ ...f, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={handleCancelEnrichment}
                disabled={enrichmentSaving}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <X size={14} />
                Cancel
              </button>
              <button
                onClick={handleSaveEnrichment}
                disabled={enrichmentSaving}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={14} />
                {enrichmentSaving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Read-only view */}
            {enrichment.bio ? (
              <div>
                <p className="text-xs text-gray-500 mb-1">Bio</p>
                <p className="text-sm text-gray-700 leading-relaxed">{enrichment.bio}</p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No bio added yet.</p>
            )}

            {enrichment.skills && enrichment.skills.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {enrichment.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {enrichment.timezone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={15} className="text-gray-400" />
                  {enrichment.timezone}
                </div>
              )}
              {enrichment.weeklyCapacityHours && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={15} className="text-gray-400" />
                  {enrichment.weeklyCapacityHours} hrs/week capacity
                </div>
              )}
              {enrichment.portfolioUrl && (
                <a
                  href={enrichment.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Globe size={15} />
                  Portfolio
                </a>
              )}
              {enrichment.linkedinUrl && (
                <a
                  href={enrichment.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
              )}
            </div>

            {!enrichment.bio &&
              !enrichment.skills?.length &&
              !enrichment.timezone &&
              !enrichment.portfolioUrl &&
              !enrichment.linkedinUrl && (
                <p className="text-xs text-gray-400 italic">
                  No profile details filled in yet. Click Edit to add them.
                </p>
              )}
          </div>
        )}
      </div>

      {/* Interview Information */}
      {profile.status === 'INTERVIEW_SCHEDULED' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Details</h2>
          <div className="space-y-3">
            {profile.scheduledStartTime && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Scheduled Time</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(profile.scheduledStartTime)}</p>
              </div>
            )}
            {profile.meetingLink && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Meeting Link</p>
                <a
                  href={profile.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <LinkIcon size={14} />
                  Join Meeting
                </a>
              </div>
            )}
            {profile.meetingNotes && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{profile.meetingNotes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
