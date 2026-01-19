'use client';

import React, { useState, useEffect } from 'react';
import {
  Users as UsersIcon,
  Plus,
  Edit2,
  Search,
  Filter,
  X,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Shield,
  Briefcase,
  Star,
  UserCircle2,
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'CLIENT' | 'MANAGER' | 'TALENT';
  status: string;
  createdAt: string;
  subscriptions?: any[];
  specializations?: string[];
  _count?: {
    clientProjects: number;
    assignedTasks: number;
  };
}

type RoleFilter = 'ALL' | 'ADMIN' | 'CLIENT' | 'MANAGER' | 'TALENT';
type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  // Create user form
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'MANAGER' as 'ADMIN' | 'MANAGER' | 'TALENT',
    specializations: [] as string[],
    password: '',
  });

  // Edit user form
  const [editFormData, setEditFormData] = useState({
    role: 'CLIENT' as 'ADMIN' | 'CLIENT' | 'MANAGER' | 'TALENT',
    active: true,
  });

  // Fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter !== 'ALL') params.append('role', roleFilter);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);
      params.append('limit', usersPerPage.toString());
      params.append('offset', ((currentPage - 1) * usersPerPage).toString());

      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      // Backend wraps response in { success: true, data: { users, total } }
      const responseData = data.data || data;
      setUsers(responseData.users || []);
      setTotal(responseData.total || 0);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter, searchQuery, currentPage]);

  // Handle create user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Validate manager specializations
    if (formData.role === 'MANAGER' && formData.specializations.length === 0) {
      setError('Please select at least one specialization for managers');
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccess(`User created successfully! They can now log in at ${window.location.origin}/login with email: ${formData.email}`);
      fetchUsers();
      closeModal();
    } catch (error: any) {
      setError(error.message || 'Failed to create user');
    }
  };

  // Handle update user role
  const handleUpdateRole = async () => {
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/admin/users/${editingUser.id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: editFormData.role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      setSuccess('User role updated successfully');
      fetchUsers();
      closeEditModal();
    } catch (error: any) {
      setError(error.message || 'Failed to update user role');
    }
  };

  // Handle toggle user status
  const handleToggleStatus = async (userId: string, currentlyActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ active: !currentlyActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setSuccess(`User ${!currentlyActive ? 'activated' : 'deactivated'} successfully`);
      fetchUsers();
    } catch (error: any) {
      setError(error.message || 'Failed to update user status');
    }
  };

  // Open/close modals
  const openModal = () => {
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      role: 'MANAGER',
      specializations: [],
      password: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditFormData({
      role: user.role,
      active: user.status === 'ACTIVE',
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
    setError('');
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    const badges = {
      ADMIN: { bg: 'bg-red-100', text: 'text-red-700', icon: Shield },
      MANAGER: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Briefcase },
      TALENT: { bg: 'bg-green-100', text: 'text-green-700', icon: Star },
      CLIENT: { bg: 'bg-gray-100', text: 'text-gray-700', icon: UserCircle2 },
    };
    const badge = badges[role as keyof typeof badges] || badges.CLIENT;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 ${badge.bg} ${badge.text} rounded text-xs font-medium`}>
        <Icon className="w-3 h-3" />
        {role}
      </span>
    );
  };

  // Pagination
  const totalPages = Math.ceil(total / usersPerPage);

  if (isLoading && users.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-sm text-gray-500">Manage platform users and create new admin, manager, and talent accounts</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Create User
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-800">
          <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span className="flex-1">{success}</span>
          <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')} className="text-red-600 hover:text-red-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="w-full md:w-48">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value as RoleFilter);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="TALENT">Talent</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as StatusFilter);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      {getRoleBadge(user.role)}
                      {user.role === 'MANAGER' && user.specializations && user.specializations.length > 0 && (
                        <div className="mt-1 text-xs text-gray-500">
                          {user.specializations.map(s => s.replace(/_/g, ' ')).join(', ')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        <Eye className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        <EyeOff className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit user"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status === 'ACTIVE')}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                          user.status === 'ACTIVE'
                            ? 'text-gray-600 hover:bg-gray-100'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No users found</p>
            {(roleFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setRoleFilter('ALL');
                  setStatusFilter('ALL');
                  setSearchQuery('');
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, total)} of {total} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New User</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temporary Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                />
                <p className="mt-1 text-xs text-gray-500">
                  User will be able to log in immediately with this password
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'MANAGER' | 'TALENT' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="MANAGER">Manager</option>
                  <option value="TALENT">Talent</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Note: CLIENT users sign up through the normal signup flow
                </p>
              </div>

              {formData.role === 'MANAGER' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specializations *
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    {[
                      { value: 'AI_MACHINE_LEARNING', label: 'AI & Machine Learning' },
                      { value: 'CYBERSECURITY', label: 'Cybersecurity' },
                      { value: 'SOFTWARE_DEVELOPMENT', label: 'Software Development' },
                      { value: 'DESIGN_CREATIVE', label: 'Design & Creative' },
                      { value: 'MARKETING_GROWTH', label: 'Marketing & Growth' },
                      { value: 'HEALTHCARE_LIFE_SCIENCES', label: 'Healthcare & Life Sciences' },
                    ].map((spec) => (
                      <label key={spec.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.specializations.includes(spec.value)}
                          onChange={(e) => {
                            const newSpecs = e.target.checked
                              ? [...formData.specializations, spec.value]
                              : formData.specializations.filter(s => s !== spec.value);
                            setFormData({ ...formData, specializations: newSpecs });
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{spec.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Select one or more solutions this manager specializes in
                  </p>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{editingUser.fullName}</div>
                  <div className="text-sm text-gray-500">{editingUser.email}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CLIENT">Client</option>
                  <option value="MANAGER">Manager</option>
                  <option value="TALENT">Talent</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="activeStatus"
                  checked={editFormData.active}
                  onChange={(e) => setEditFormData({ ...editFormData, active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="activeStatus" className="text-sm font-medium text-gray-700">
                  Active Status
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleUpdateRole();
                    if (editFormData.active !== (editingUser.status === 'ACTIVE')) {
                      handleToggleStatus(editingUser.id, editingUser.status === 'ACTIVE');
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
