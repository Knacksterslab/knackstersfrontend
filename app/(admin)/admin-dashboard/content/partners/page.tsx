'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  active: boolean;
  category?: 'client' | 'technology';
  website?: string;
}

export default function PartnersManagementPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    logoUrl: '',
    active: true,
    category: 'client' as 'client' | 'technology',
    website: '',
  });

  // Fetch partners
  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/admin/partners');
      const data = await response.json();
      setPartners(data.partners || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setError('Failed to load partners');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setUploadedFile(data.url);
      setFormData((prev) => ({ ...prev, logoUrl: data.url }));
    } catch (error: any) {
      setError(error.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const method = editingPartner ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/partners', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      setSuccess(editingPartner ? 'Partner updated successfully!' : 'Partner added successfully!');
      fetchPartners();
      closeModal();
    } catch (error: any) {
      setError(error.message || 'Failed to save partner');
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const response = await fetch(`/api/admin/partners?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setSuccess('Partner deleted successfully!');
      fetchPartners();
    } catch (error) {
      setError('Failed to delete partner');
    }
  };

  // Handle toggle active
  const handleToggleActive = async (partner: Partner) => {
    try {
      const response = await fetch('/api/admin/partners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: partner.id, active: !partner.active }),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      fetchPartners();
    } catch (error) {
      setError('Failed to toggle partner status');
    }
  };

  // Open modal for new partner
  const openNewModal = () => {
    setEditingPartner(null);
    setFormData({
      id: '',
      name: '',
      logoUrl: '',
      active: true,
      category: 'client',
      website: '',
    });
    setUploadedFile('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      id: partner.id,
      name: partner.name,
      logoUrl: partner.logoUrl,
      active: partner.active,
      category: partner.category || 'client',
      website: partner.website || '',
    });
    setUploadedFile(partner.logoUrl);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPartner(null);
    setFormData({
      id: '',
      name: '',
      logoUrl: '',
      active: true,
      category: 'client',
      website: '',
    });
    setUploadedFile('');
    setError('');
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Loading partners...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Partner Logos</h1>
          <p className="text-sm text-gray-500">Manage company partner logos displayed on the landing page</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <Check className="w-5 h-5" />
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`bg-white rounded-xl border p-6 ${
              partner.active ? 'border-gray-200' : 'border-gray-300 opacity-60'
            }`}
          >
            {/* Logo Preview */}
            <div className="mb-4 h-20 flex items-center justify-center bg-gray-50 rounded-lg">
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={160}
                height={60}
                className="object-contain max-h-16"
              />
            </div>

            {/* Partner Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {partner.category || 'client'}
                </span>
                {partner.active ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded flex items-center gap-1">
                    <EyeOff className="w-3 h-3" />
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleActive(partner)}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                {partner.active ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => openEditModal(partner)}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(partner.id)}
                className="px-3 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {partners.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No partners added yet</p>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Add Your First Partner
        </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Partner ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner ID *
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., company-name"
                  required
                  disabled={!!editingPartner}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Unique identifier (lowercase, hyphens only)
                </p>
              </div>

              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Company Name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as 'client' | 'technology' })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="client">Client</option>
                  <option value="technology">Technology Partner</option>
                </select>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <div className="h-24 flex items-center justify-center bg-gray-50 rounded">
                        <Image
                          src={uploadedFile}
                          alt="Preview"
                          width={160}
                          height={60}
                          className="object-contain max-h-20"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFile('');
                          setFormData({ ...formData, logoUrl: '' });
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-block font-medium">
                          {isUploading ? 'Uploading...' : 'Choose File'}
                        </span>
                        <input
                          type="file"
                          accept="image/svg+xml,image/png,image/jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        SVG, PNG, or JPG (Max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Active (display on landing page)
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.id || !formData.name || !formData.logoUrl}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingPartner ? 'Update Partner' : 'Add Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
