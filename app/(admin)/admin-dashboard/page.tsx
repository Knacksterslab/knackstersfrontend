'use client';

import { useState, useEffect } from 'react';
import { Users, Briefcase, Clock, DollarSign, UserCheck, Calendar } from 'lucide-react';
import Link from 'next/link';

interface TalentApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryExpertise: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [talentApplications, setTalentApplications] = useState<TalentApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending talent applications
  useEffect(() => {
    async function fetchTalentApplications() {
      try {
        const response = await fetch('/api/admin/talent?status=PENDING_REVIEW');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setTalentApplications(data.data?.slice(0, 5) || []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch talent applications:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTalentApplications();
  }, []);

  const stats = [
    {
      title: 'Total Talents',
      value: '9,999+',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Clients',
      value: '1,234',
      icon: Briefcase,
      color: 'bg-green-500',
    },
    {
      title: 'Hours Delivered',
      value: '960,000+',
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      title: 'Revenue',
      value: '$2.4M',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  const quickLinks = [
    {
      title: 'Review Talent Applications',
      description: 'View and manage pending talent applications',
      href: '/admin-dashboard/talent',
      icon: UserCheck,
    },
    {
      title: 'Manage Partner Logos',
      description: 'Add, edit, or remove company partner logos',
      href: '/admin-dashboard/content/partners',
    },
    {
      title: 'View All Users',
      description: 'Manage talents, clients, and business managers',
      href: '/admin-dashboard/users',
    },
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your platform content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all relative group"
              >
                {Icon && (
                  <div className="mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pending Talent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Pending Talent Applications</h2>
          {talentApplications.length > 0 && (
            <Link
              href="/admin-dashboard/talent"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          )}
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-sm text-gray-500">Loading applications...</p>
            </div>
          ) : talentApplications.length === 0 ? (
            <div className="p-8 text-center">
              <UserCheck size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-500 mb-1">No pending applications</p>
              <p className="text-xs text-gray-400">New talent applications will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {talentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/admin-dashboard/talent/${application.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {application.firstName} {application.lastName}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                        {formatStatus(application.status)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{application.primaryExpertise}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>Applied {formatDate(application.createdAt)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    Review →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
