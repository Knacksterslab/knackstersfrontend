'use client';

import { useState, useEffect } from 'react';
import { UserCheck, Search, Calendar, Mail, ExternalLink, Filter } from 'lucide-react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/client';

interface TalentApplication {
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
}

export default function TalentManagementPage() {
  const [applications, setApplications] = useState<TalentApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<TalentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Fetch talent applications
  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await adminApi.getTalentApplications();
        if (data.success) {
          setApplications(data.data || []);
          setFilteredApplications(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch talent applications:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = applications;

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        app =>
          app.firstName.toLowerCase().includes(query) ||
          app.lastName.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query) ||
          app.primaryExpertise.toLowerCase().includes(query)
      );
    }

    setFilteredApplications(filtered);
  }, [searchQuery, statusFilter, applications]);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return 'bg-yellow-100 text-yellow-700';
      case 'INTERVIEW_SCHEDULED':
        return 'bg-blue-100 text-blue-700';
      case 'APPROVED':
        return 'bg-green-100 text-green-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Format status text
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const statusOptions = [
    { value: 'ALL', label: 'All Status' },
    { value: 'PENDING_REVIEW', label: 'Pending Review' },
    { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Talent Applications</h1>
              </div>
              <p className="text-sm text-gray-500">
                Review and manage talent applications
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredApplications.length}</span> of{' '}
                  <span className="font-semibold">{applications.length}</span> applications
                </p>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-500">Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="p-12 text-center">
                  <UserCheck size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    {searchQuery || statusFilter !== 'ALL'
                      ? 'No applications found'
                      : 'No talent applications yet'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {searchQuery || statusFilter !== 'ALL'
                      ? 'Try adjusting your filters'
                      : 'New applications will appear here'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Talent
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Expertise
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Rate
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Applied
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredApplications.map((application) => (
                          <tr
                            key={application.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {application.firstName} {application.lastName}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                  <Mail size={12} />
                                  <span>{application.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-900">{application.primaryExpertise}</p>
                              {application.additionalSkills && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                  {application.additionalSkills}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-gray-900">
                                ${application.hourlyRate}/hr
                              </p>
                              <p className="text-xs text-gray-500">{application.preferredWorkType}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}
                              >
                                {formatStatus(application.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Calendar size={14} />
                                <span>{formatDate(application.createdAt)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link
                                href={`/admin-dashboard/talent/${application.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Review
                                <ExternalLink size={14} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden divide-y divide-gray-200">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {application.firstName} {application.lastName}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <Mail size={14} />
                              <span>{application.email}</span>
                            </div>
                          </div>
                          <span
                            className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}
                          >
                            {formatStatus(application.status)}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4 text-sm">
                          <div>
                            <span className="text-gray-500">Expertise: </span>
                            <span className="text-gray-900 font-medium">{application.primaryExpertise}</span>
                          </div>
                          {application.additionalSkills && (
                            <div>
                              <span className="text-gray-500">Skills: </span>
                              <span className="text-gray-900">{application.additionalSkills}</span>
                            </div>
                          )}
                          <div className="flex gap-4">
                            <div>
                              <span className="text-gray-500">Rate: </span>
                              <span className="font-semibold text-gray-900">${application.hourlyRate}/hr</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Type: </span>
                              <span className="text-gray-900">{application.preferredWorkType}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar size={14} />
                            <span>Applied {formatDate(application.createdAt)}</span>
                          </div>
                        </div>

                        <Link
                          href={`/admin-dashboard/talent/${application.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Review Application
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
      </div>
    </div>
  );
}
