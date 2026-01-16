'use client';

import { Users, Briefcase, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
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
      title: 'Manage Partner Logos',
      description: 'Add, edit, or remove company partner logos',
      href: '/admin-dashboard/content/partners',
    },
    {
      title: 'View All Users',
      description: 'Manage talents, clients, and business managers',
      href: '/admin-dashboard/users',
      badge: 'Coming Soon',
    },
    {
      title: 'Platform Settings',
      description: 'Configure platform-wide settings',
      href: '/admin-dashboard/settings',
      badge: 'Coming Soon',
    },
  ];

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
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all relative group"
            >
              {link.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  {link.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500 text-center py-8 text-sm">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
