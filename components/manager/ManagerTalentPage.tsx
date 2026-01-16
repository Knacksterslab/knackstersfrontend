'use client'

import React, { useState } from 'react'
import ManagerPageWrapper from './ManagerPageWrapper'
import { 
  UserCheck, 
  Mail,
  Phone,
  Globe,
  Clock,
  DollarSign,
  Star,
  Briefcase,
  Filter
} from 'lucide-react'

export default function ManagerTalentPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const talent = [
    {
      id: '1',
      name: 'Alex Anderson',
      expertise: 'Full-Stack Development',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      email: 'alex.anderson@email.com',
      phone: '+1 (555) 234-5678',
      portfolio: 'github.com/alexanderson',
      hourlyRate: 85,
      availability: 'Full-time',
      hoursPerWeek: 40,
      rating: 4.9,
      completedTasks: 28,
      status: 'available',
      currentTasks: 2
    },
    {
      id: '2',
      name: 'Jessica Martinez',
      expertise: 'UI/UX Design',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      email: 'jessica.martinez@email.com',
      phone: '+1 (555) 345-6789',
      portfolio: 'behance.net/jessicam',
      hourlyRate: 75,
      availability: 'Part-time',
      hoursPerWeek: 20,
      rating: 5.0,
      completedTasks: 42,
      status: 'available',
      currentTasks: 1
    },
    {
      id: '3',
      name: 'Michael Chen',
      expertise: 'Backend Development',
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Kubernetes'],
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      portfolio: 'github.com/mchen',
      hourlyRate: 90,
      availability: 'Freelance',
      hoursPerWeek: 30,
      rating: 4.8,
      completedTasks: 35,
      status: 'busy',
      currentTasks: 4
    },
    {
      id: '4',
      name: 'Sarah Williams',
      expertise: 'Mobile Development',
      skills: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase'],
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 567-8901',
      portfolio: 'github.com/sarahw',
      hourlyRate: 80,
      availability: 'Full-time',
      hoursPerWeek: 40,
      rating: 4.7,
      completedTasks: 21,
      status: 'available',
      currentTasks: 2
    },
    {
      id: '5',
      name: 'David Kim',
      expertise: 'DevOps Engineering',
      skills: ['AWS', 'Terraform', 'Jenkins', 'Docker', 'Monitoring'],
      email: 'david.kim@email.com',
      phone: '+1 (555) 678-9012',
      portfolio: 'linkedin.com/in/davidkim',
      hourlyRate: 95,
      availability: 'Freelance',
      hoursPerWeek: 25,
      rating: 4.9,
      completedTasks: 31,
      status: 'available',
      currentTasks: 1
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700'
      case 'busy': return 'bg-yellow-100 text-yellow-700'
      case 'unavailable': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredTalent = talent.filter(t => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'available') return t.status === 'available'
    if (selectedFilter === 'busy') return t.status === 'busy'
    return true
  })

  return (
    <ManagerPageWrapper>
      {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Pool</h1>
                <p className="text-gray-600">Manage your talent network and match them with projects</p>
              </div>
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                Invite New Talent
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <UserCheck size={20} className="text-purple-600" />
                  <span className="text-sm text-gray-600">Total Talent</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">28</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">18</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase size={20} className="text-blue-600" />
                  <span className="text-sm text-gray-600">On Tasks</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">10</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Star size={20} className="text-orange-600" />
                  <span className="text-sm text-gray-600">Avg. Rating</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">4.8</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter size={20} />
                  <span className="font-semibold">Filter:</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === 'all'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({talent.length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('available')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === 'available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Available ({talent.filter(t => t.status === 'available').length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('busy')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === 'busy'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Busy ({talent.filter(t => t.status === 'busy').length})
                  </button>
                </div>
              </div>
            </div>

            {/* Talent Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTalent.map((person) => (
                <div key={person.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                        <p className="text-sm text-gray-600">{person.expertise}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(person.status)}`}>
                      {person.status}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {person.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} />
                      <span>{person.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <span>{person.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe size={16} />
                      <span>{person.portfolio}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign size={16} className="text-gray-600" />
                        <span className="text-xs text-gray-600">Hourly Rate</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">${person.hourlyRate}/hr</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={16} className="text-gray-600" />
                        <span className="text-xs text-gray-600">Availability</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{person.hoursPerWeek}h/week</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={16} className="text-gray-600" />
                        <span className="text-xs text-gray-600">Rating</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{person.rating} ⭐</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={16} className="text-gray-600" />
                        <span className="text-xs text-gray-600">Completed</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{person.completedTasks}</p>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Current workload:</strong> {person.currentTasks} active task{person.currentTasks !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Assign Task
                    </button>
                    <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
      </div>
    </ManagerPageWrapper>
  )
}

