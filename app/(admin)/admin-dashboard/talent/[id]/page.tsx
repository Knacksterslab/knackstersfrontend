'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  UserCheck,
  Mail,
  DollarSign,
  Briefcase,
  Clock,
  MapPin,
  ExternalLink,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

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
}

export default function TalentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const talentId = params.id as string;
  
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch talent profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/admin/talent/${talentId}`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setProfile(data.data);
          }
        } else if (response.status === 404) {
          router.push('/admin-dashboard/talent');
        }
      } catch (error) {
        console.error('Failed to fetch talent profile:', error);
      } finally {
        setLoading(false);
      }
    }

    if (talentId) {
      fetchProfile();
    }
  }, [talentId, router]);

  // Update status
  const handleStatusUpdate = async (newStatus: string) => {
    if (!profile) return;

    setActionLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/admin/talent/${talentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProfile(data.data);
          alert(`Status updated to ${formatStatus(newStatus)}`);
        }
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'INTERVIEW_SCHEDULED':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Format status text
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
          <Link
            href="/admin-dashboard/talent"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Back Button */}
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="text-gray-600">{profile.primaryExpertise}</p>
                  </div>
                </div>
                
                <span
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${getStatusColor(profile.status)}`}
                >
                  {formatStatus(profile.status)}
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign size={16} className="text-gray-400" />
                  <span>${profile.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Applied {formatDate(profile.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {profile.status === 'PENDING_REVIEW' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate('APPROVED')}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={20} />
                    Approve Application
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('REJECTED')}
                    disabled={actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle size={20} />
                    Reject Application
                  </button>
                </div>
              </div>
            )}

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Work Preferences */}
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

              {/* Skills & Expertise */}
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

            {/* Profile URLs */}
            {profile.profileUrls && profile.profileUrls.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio & Links</h2>
                <div className="space-y-2">
                  {profile.profileUrls.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink size={14} />
                      <span>{url}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Information */}
            {profile.status === 'INTERVIEW_SCHEDULED' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Details</h2>
                <div className="space-y-3">
                  {profile.scheduledStartTime && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Scheduled Time</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(profile.scheduledStartTime)}
                      </p>
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
                        Join Meeting
                        <ExternalLink size={14} />
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
