'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users as UsersIcon,
  Plus,
  Edit2,
  Search,
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
  Camera,
  Trash2,
} from 'lucide-react';
import { adminApi } from '@/lib/api/client';

interface User {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'CLIENT' | 'MANAGER' | 'TALENT';
  status: string;
  createdAt: string;
  avatarUrl?: string | null;
  subscriptions?: any[];
  specializations?: string[];
  _count?: {
    clientProjects: number;
    assignedTasks: number;
  };
}

type RoleFilter = 'ALL' | 'ADMIN' | 'CLIENT' | 'MANAGER' | 'TALENT';
type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

/** Center-crop any image file to a 512×512 JPEG blob using Canvas API */
function cropToSquare(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 512, 512);
      URL.revokeObjectURL(objectUrl);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
        'image/jpeg',
        0.92
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Failed to load image')); };
    img.src = objectUrl;
  });
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

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
  });

  // Edit user form
  const [editFormData, setEditFormData] = useState({
    role: 'CLIENT' as 'ADMIN' | 'CLIENT' | 'MANAGER' | 'TALENT',
    active: true,
    specializations: [] as string[],
  });

  // Avatar state for edit modal
  const editAvatarInputRef = useRef<HTMLInputElement>(null);
  const [editAvatarPreviewUrl, setEditAvatarPreviewUrl] = useState<string | null>(null);
  const [editAvatarBlob, setEditAvatarBlob] = useState<Blob | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarRemoving, setAvatarRemoving] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const filters: any = {
        limit: usersPerPage,
        offset: (currentPage - 1) * usersPerPage,
      };
      
      if (roleFilter !== 'ALL') filters.role = roleFilter;
      if (statusFilter !== 'ALL') filters.status = statusFilter;
      if (searchQuery) filters.search = searchQuery;

      const data = await adminApi.getUsers(filters);
      
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

    // Validate manager specializations
    if (formData.role === 'MANAGER' && formData.specializations.length === 0) {
      setError('Please select at least one specialization for managers');
      return;
    }

    try {
      const data = await adminApi.createUser(formData as any);

      if (!data.success) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccess(`User created successfully! An invite email has been sent to ${formData.email} so they can set their own password.`);
      fetchUsers();
      closeModal();
    } catch (error: any) {
      setError(error.message || 'Failed to create user');
    }
  };

  // Handle update user role (and specializations for managers)
  const handleUpdateRole = async () => {
    if (!editingUser) return;

    const isManager = editFormData.role === 'MANAGER';
    if (isManager && editFormData.specializations.length === 0) {
      setError('Please select at least one specialization for managers');
      return;
    }

    try {
      await adminApi.updateUserRole(editingUser.id, editFormData.role);

      if (isManager) {
        await adminApi.updateManagerSpecializations(editingUser.id, editFormData.specializations);
      }

      setSuccess('User updated successfully');
      fetchUsers();
      closeEditModal();
    } catch (error: any) {
      setError(error.message || 'Failed to update user');
    }
  };

  // Handle toggle user status
  const handleToggleStatus = async (userId: string, currentlyActive: boolean) => {
    try {
      await adminApi.toggleUserStatus(userId, !currentlyActive);

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
      specializations: user.specializations ?? [],
    });
    setEditAvatarPreviewUrl(null);
    setEditAvatarBlob(null);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (editAvatarPreviewUrl) URL.revokeObjectURL(editAvatarPreviewUrl);
    setEditAvatarPreviewUrl(null);
    setEditAvatarBlob(null);
    setIsEditModalOpen(false);
    setEditingUser(null);
    setError('');
  };

  const handleEditAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    try {
      const blob = await cropToSquare(file);
      const url = URL.createObjectURL(blob);
      if (editAvatarPreviewUrl) URL.revokeObjectURL(editAvatarPreviewUrl);
      setEditAvatarPreviewUrl(url);
      setEditAvatarBlob(blob);
    } catch {
      setError('Could not process image. Please try a different file.');
    }
  };

  const handleUploadManagerAvatar = async () => {
    if (!editingUser || !editAvatarBlob) return;
    setAvatarUploading(true);
    setError('');
    try {
      const res = await adminApi.uploadManagerAvatar(editingUser.id, editAvatarBlob);
      if (res.success && res.data?.avatarUrl) {
        setEditingUser((prev) => prev ? { ...prev, avatarUrl: res.data.avatarUrl } : prev);
        setUsers((prev) => prev.map((u) => u.id === editingUser.id ? { ...u, avatarUrl: res.data.avatarUrl } : u));
        if (editAvatarPreviewUrl) URL.revokeObjectURL(editAvatarPreviewUrl);
        setEditAvatarPreviewUrl(null);
        setEditAvatarBlob(null);
        setSuccess('Photo updated successfully.');
      } else {
        throw new Error(res.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload photo.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleRemoveManagerAvatar = async () => {
    if (!editingUser) return;
    setAvatarRemoving(true);
    setError('');
    try {
      await adminApi.removeManagerAvatar(editingUser.id);
      setEditingUser((prev) => prev ? { ...prev, avatarUrl: null } : prev);
      setUsers((prev) => prev.map((u) => u.id === editingUser.id ? { ...u, avatarUrl: null } : u));
      setSuccess('Photo removed.');
    } catch (err: any) {
      setError(err.message || 'Failed to remove photo.');
    } finally {
      setAvatarRemoving(false);
    }
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

      {/* Users */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {users.length === 0 ? (
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
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
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

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {users.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
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
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    {getRoleBadge(user.role)}
                    {user.role === 'MANAGER' && user.specializations && user.specializations.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {user.specializations.map(s => s.replace(/_/g, ' ')).join(', ')}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Created {new Date(user.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id, user.status === 'ACTIVE')}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        user.status === 'ACTIVE'
                          ? 'text-gray-600 border border-gray-300 hover:bg-gray-100'
                          : 'text-green-600 border border-green-600 hover:bg-green-50'
                      }`}
                    >
                      {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                  An invite email will be sent so the user can set their own password. CLIENT users sign up through the normal signup flow.
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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

              {/* Avatar section — managers only */}
              {editingUser.role === 'MANAGER' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    {/* Avatar preview */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-gray-200">
                      {(editAvatarPreviewUrl ?? editingUser.avatarUrl) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={editAvatarPreviewUrl ?? editingUser.avatarUrl!}
                          alt={editingUser.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-lg font-bold">{getInitials(editingUser.fullName)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      {editAvatarBlob ? (
                        /* Pending upload */
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleUploadManagerAvatar}
                            disabled={avatarUploading}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
                          >
                            {avatarUploading
                              ? <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
                              : <Check className="w-3 h-3" />}
                            {avatarUploading ? 'Saving…' : 'Save photo'}
                          </button>
                          <button
                            type="button"
                            onClick={() => { if (editAvatarPreviewUrl) URL.revokeObjectURL(editAvatarPreviewUrl); setEditAvatarPreviewUrl(null); setEditAvatarBlob(null); }}
                            disabled={avatarUploading}
                            className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-gray-50 disabled:opacity-60 transition-colors"
                          >
                            Discard
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => editAvatarInputRef.current?.click()}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Camera className="w-3 h-3" />
                            {editingUser.avatarUrl ? 'Change' : 'Upload'}
                          </button>
                          {editingUser.avatarUrl && (
                            <button
                              type="button"
                              onClick={handleRemoveManagerAvatar}
                              disabled={avatarRemoving}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 border border-red-200 text-xs font-medium rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              {avatarRemoving ? 'Removing…' : 'Remove'}
                            </button>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-gray-400">PNG, JPG or WebP · Max 5 MB · Auto-cropped square</p>
                    </div>
                  </div>
                  <input
                    ref={editAvatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleEditAvatarSelect}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as any, specializations: [] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CLIENT">Client</option>
                  <option value="MANAGER">Manager</option>
                  <option value="TALENT">Talent</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {editFormData.role === 'MANAGER' && (
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
                          checked={editFormData.specializations.includes(spec.value)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...editFormData.specializations, spec.value]
                              : editFormData.specializations.filter(s => s !== spec.value);
                            setEditFormData({ ...editFormData, specializations: updated });
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{spec.label}</span>
                      </label>
                    ))}
                  </div>
                  {editFormData.specializations.length === 0 && (
                    <p className="mt-1 text-xs text-red-500">Select at least one specialization</p>
                  )}
                </div>
              )}

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
