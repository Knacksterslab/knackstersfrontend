'use client'

import React, { useState } from 'react'
import TalentPageWrapper from './TalentPageWrapper'
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

export default function TalentTimesheetPage() {
  const [currentWeek, setCurrentWeek] = useState(0)

  const weekData = [
    { date: 'Mon, Dec 16', hours: 8, tasks: ['Design Homepage', 'Code Review'] },
    { date: 'Tue, Dec 17', hours: 7.5, tasks: ['User Authentication', 'Bug Fixes'] },
    { date: 'Wed, Dec 18', hours: 8, tasks: ['Marketing Banner', 'Documentation'] },
    { date: 'Thu, Dec 19', hours: 6, tasks: ['Database Schema'] },
    { date: 'Fri, Dec 20', hours: 4, tasks: ['Marketing Banner'] },
    { date: 'Sat, Dec 21', hours: 0, tasks: [] },
    { date: 'Sun, Dec 22', hours: 0, tasks: [] }
  ]

  const timeEntries = [
    {
      id: '1',
      date: 'Dec 18, 2025',
      task: 'Design Homepage Mockup',
      project: 'Website Redesign',
      hours: 4.5,
      status: 'Approved'
    },
    {
      id: '2',
      date: 'Dec 17, 2025',
      task: 'Implement User Authentication',
      project: 'Mobile App Development',
      hours: 6,
      status: 'Pending'
    },
    {
      id: '3',
      date: 'Dec 18, 2025',
      task: 'Create Marketing Banner',
      project: 'Q1 Marketing Campaign',
      hours: 2,
      status: 'Approved'
    },
    {
      id: '4',
      date: 'Dec 16, 2025',
      task: 'Database Schema Design',
      project: 'Backend Infrastructure',
      hours: 6,
      status: 'Approved'
    }
  ]

  const totalHours = weekData.reduce((sum, day) => sum + day.hours, 0)

  const getStatusColor = (status: string) => {
    return status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
  }

  return (
    <TalentPageWrapper>
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Timesheet</h1>
              <p className="text-sm sm:text-base text-gray-600">Track and submit your work hours</p>
            </div>

            {/* Week Summary Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">This Week</h2>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button 
                    onClick={() => setCurrentWeek(currentWeek - 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center whitespace-nowrap">
                    Dec 16 - Dec 22, 2025
                  </span>
                  <button 
                    onClick={() => setCurrentWeek(currentWeek + 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Week Grid - Responsive */}
              <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 min-w-[640px] sm:min-w-0">
                  {weekData.map((day, index) => (
                    <div
                      key={index}
                      className={`p-3 sm:p-4 rounded-lg border-2 ${
                        day.hours > 0
                          ? 'border-orange-200 bg-orange-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="text-xs text-gray-600 mb-2 whitespace-nowrap">{day.date}</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{day.hours}h</div>
                      {day.tasks.length > 0 && (
                        <div className="text-xs text-gray-700 space-y-1">
                          {day.tasks.map((task, idx) => (
                            <div key={idx} className="truncate" title={task}>{task}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              {/* Total Hours */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <span className="text-sm sm:text-base font-semibold text-gray-900">Total Hours This Week</span>
                <span className="text-xl sm:text-2xl font-bold text-orange-600">{totalHours} hours</span>
              </div>
            </div>

            {/* Time Entries */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Time Entries</h2>
                <button className="w-full sm:w-auto px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} />
                  <span className="text-sm sm:text-base">Add Entry</span>
                </button>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Date</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Task</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Project</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Hours</th>
                      <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeEntries.map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50 last:border-b-0">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {entry.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.task}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{entry.project}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <Clock size={16} />
                            {entry.hours}h
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {timeEntries.map((entry) => (
                  <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{entry.task}</h3>
                        <p className="text-sm text-gray-500">{entry.project}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        <span>{entry.date}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-gray-900">
                        <Clock size={16} />
                        <span>{entry.hours}h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Timesheet */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-blue-900 mb-1">Ready to Submit?</h3>
                    <p className="text-xs sm:text-sm text-blue-700">
                      Once you've reviewed your timesheet for this week, submit it for approval by your Business Manager.
                    </p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Submit Timesheet
                </button>
              </div>
      </div>
    </TalentPageWrapper>
  )
}

