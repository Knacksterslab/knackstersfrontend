'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  Calendar,
  Clock,
  Video,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  XCircle,
  Plus,
  AlertCircle
} from 'lucide-react'

export default function ManagerMeetGreetPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming')

  const upcomingMeetings = [
    {
      id: 'm1',
      talent: 'Jessica Martinez',
      expertise: 'UI/UX Design',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      email: 'jessica.martinez@email.com',
      phone: '+1 (555) 345-6789',
      portfolio: 'behance.net/jessicam',
      date: 'Tomorrow',
      time: '10:00 AM',
      fullDate: 'Dec 20, 2025',
      duration: '30 minutes',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'Experienced designer looking for freelance opportunities. Portfolio shows strong work in SaaS products.',
      status: 'confirmed'
    },
    {
      id: 'm2',
      talent: 'David Kim',
      expertise: 'DevOps Engineering',
      skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD'],
      email: 'david.kim@email.com',
      phone: '+1 (555) 678-9012',
      portfolio: 'linkedin.com/in/davidkim',
      date: 'Dec 21, 2025',
      time: '2:00 PM',
      fullDate: 'Dec 21, 2025',
      duration: '30 minutes',
      meetingLink: 'https://zoom.us/j/987654321',
      notes: '8+ years experience in cloud infrastructure. Currently working full-time but looking for side projects.',
      status: 'confirmed'
    },
    {
      id: 'm3',
      talent: 'Emily Rodriguez',
      expertise: 'Content Writer',
      skills: ['Copywriting', 'SEO', 'Technical Writing', 'Blog Posts'],
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 789-0123',
      portfolio: 'emilyrodriguez.com',
      date: 'Dec 23, 2025',
      time: '11:00 AM',
      fullDate: 'Dec 23, 2025',
      duration: '30 minutes',
      meetingLink: 'https://zoom.us/j/456789123',
      notes: 'Specializes in B2B SaaS content. Has worked with several tech startups.',
      status: 'pending'
    }
  ]

  const completedMeetings = [
    {
      id: 'm4',
      talent: 'Alex Anderson',
      expertise: 'Full-Stack Development',
      date: 'Dec 18, 2025',
      time: '3:00 PM',
      outcome: 'Approved',
      rating: 5,
      decision: 'Added to talent pool - excellent fit for web development projects',
      nextSteps: 'Send onboarding documents and NDA'
    },
    {
      id: 'm5',
      talent: 'Michael Chen',
      expertise: 'Backend Development',
      date: 'Dec 17, 2025',
      time: '10:00 AM',
      outcome: 'Approved',
      rating: 5,
      decision: 'Strong backend skills, perfect for API development',
      nextSteps: 'Schedule technical assessment'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <ManagerPageWrapper>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Meet & Greet</h1>
                <p className="text-sm sm:text-base text-gray-600">Schedule and manage talent onboarding interviews</p>
              </div>
              <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                <Plus size={20} />
                Schedule New Meeting
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Calendar size={18} className="text-purple-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600">Upcoming</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{upcomingMeetings.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600">Completed</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{completedMeetings.length}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Clock size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600">Today</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">1</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <XCircle size={18} className="text-red-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-600">Cancelled</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">0</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center border-b border-gray-200 overflow-x-auto">
                <button
                  onClick={() => setSelectedTab('upcoming')}
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    selectedTab === 'upcoming'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upcoming ({upcomingMeetings.length})
                </button>
                <button
                  onClick={() => setSelectedTab('completed')}
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    selectedTab === 'completed'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Completed ({completedMeetings.length})
                </button>
                <button
                  onClick={() => setSelectedTab('all')}
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    selectedTab === 'all'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All Meetings
                </button>
              </div>

              {/* Upcoming Meetings */}
              {selectedTab === 'upcoming' && (
                <div className="p-3 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="border-2 border-purple-200 bg-purple-50 rounded-lg p-4 sm:p-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{meeting.talent}</h3>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full w-fit ${getStatusColor(meeting.status)}`}>
                                {meeting.status}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3">{meeting.expertise}</p>
                          </div>
                        </div>

                        {/* Meeting Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                          <div className="bg-white rounded-lg p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3">
                              <Calendar size={18} className="text-purple-600 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-600">Meeting Date</p>
                                <p className="text-sm sm:text-base font-semibold text-gray-900">{meeting.date} • {meeting.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Clock size={18} className="text-purple-600 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-600">Duration</p>
                                <p className="text-sm sm:text-base font-semibold text-gray-900">{meeting.duration}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Mail size={16} className="text-gray-400 flex-shrink-0" />
                              <p className="text-xs sm:text-sm text-gray-700 truncate">{meeting.email}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Phone size={16} className="text-gray-400 flex-shrink-0" />
                              <p className="text-xs sm:text-sm text-gray-700">{meeting.phone}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Globe size={16} className="text-gray-400 flex-shrink-0" />
                              <p className="text-xs sm:text-sm text-gray-700 truncate">{meeting.portfolio}</p>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {meeting.skills.map((skill, index) => (
                              <span key={index} className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        {meeting.notes && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
                            <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">Pre-Meeting Notes</p>
                            <p className="text-xs sm:text-sm text-blue-800">{meeting.notes}</p>
                          </div>
                        )}

                        {/* Meeting Link */}
                        <div className="bg-white border border-purple-200 rounded-lg p-3 sm:p-4 mb-4">
                          <div className="flex items-start sm:items-center gap-3">
                            <Video size={20} className="text-purple-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Meeting Link</p>
                              <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 underline break-all">
                                {meeting.meetingLink}
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                            <Video size={20} />
                            Join Meeting
                          </button>
                          <button className="w-full sm:w-auto px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            Reschedule
                          </button>
                          <button className="w-full sm:w-auto px-4 py-3 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Meetings */}
              {selectedTab === 'completed' && (
                <div className="p-3 sm:p-6">
                  <div className="space-y-4">
                    {completedMeetings.map((meeting) => (
                      <div key={meeting.id} className="border border-green-200 bg-green-50 rounded-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
                          <CheckCircle size={28} className="text-green-600 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{meeting.talent}</h3>
                              <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full w-fit">
                                {meeting.outcome}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">{meeting.expertise}</p>
                            <p className="text-xs text-gray-500">{meeting.date} • {meeting.time}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">Rating</p>
                            <p className="text-xl sm:text-2xl">{'⭐'.repeat(meeting.rating)}</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Decision</p>
                          <p className="text-xs sm:text-sm text-gray-700 mb-3">{meeting.decision}</p>
                          <p className="text-xs text-gray-600"><strong>Next Steps:</strong> {meeting.nextSteps}</p>
                        </div>

                        <button className="w-full sm:w-auto px-4 py-2 border-2 border-green-600 text-green-700 text-sm rounded-lg font-semibold hover:bg-green-100 transition-colors">
                          View Full Notes
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Meetings */}
              {selectedTab === 'all' && (
                <div className="p-6">
                  <p className="text-center text-gray-500 py-8">All meetings view - Combined list of upcoming and completed</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-blue-900 mb-2">Meet & Greet Best Practices</h3>
                  <ul className="text-xs sm:text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Review talent portfolio and background before the meeting</li>
                    <li>Assess cultural fit and communication skills</li>
                    <li>Discuss availability, rates, and work preferences</li>
                    <li>Take detailed notes for future project matching</li>
                    <li>Follow up within 24 hours with next steps</li>
                  </ul>
                </div>
              </div>
      </div>
    </ManagerPageWrapper>
  )
}

