'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  slug: string;
  faqs: FAQItem[];
}

interface FAQContent {
  categories: FAQCategory[];
}

export default function FAQEditor() {
  const [content, setContent] = useState<FAQContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<{ categoryId: string; faqId: string | null } | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  // Available icons for categories
  const availableIcons = [
    'Globe', 'Award', 'DollarSign', 'Zap', 'Clock', 'Shield',
    'Users', 'FileText', 'CreditCard', 'CheckCircle2',
  ];

  // Fetch content
  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/pages/faq', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to load FAQ content');
      }

      const data = await response.json();
      setContent(data.content || { categories: [] });
    } catch (error: any) {
      setError(error.message || 'Failed to load FAQ content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/pages/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to save FAQ content');
      }

      setSuccess('FAQ content saved successfully!');
      setTimeout(() => setSuccess(''), 5000);
    } catch (error: any) {
      setError(error.message || 'Failed to save FAQ content');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    if (confirm('Are you sure you want to discard all changes?')) {
      fetchContent();
      setSuccess('');
      setError('');
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Add category
  const addCategory = () => {
    if (!content) return;
    const newCategory: FAQCategory = {
      id: Date.now().toString(),
      title: 'New Category',
      icon: 'Globe',
      slug: 'new-category',
      faqs: [],
    };
    setContent({
      ...content,
      categories: [...content.categories, newCategory],
    });
  };

  // Update category
  const updateCategory = (categoryId: string, field: string, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      categories: content.categories.map(cat =>
        cat.id === categoryId ? { ...cat, [field]: value } : cat
      ),
    });
  };

  // Delete category
  const deleteCategory = (categoryId: string) => {
    if (!content) return;
    if (!confirm('Are you sure you want to delete this category?')) return;
    setContent({
      ...content,
      categories: content.categories.filter(cat => cat.id !== categoryId),
    });
  };

  // Add FAQ
  const addFAQ = (categoryId: string) => {
    setEditingItem({ categoryId, faqId: null });
    setFormData({ question: '', answer: '' });
  };

  // Edit FAQ
  const editFAQ = (categoryId: string, faqId: string) => {
    if (!content) return;
    const category = content.categories.find(cat => cat.id === categoryId);
    const faq = category?.faqs.find(f => f.id === faqId);
    if (faq) {
      setEditingItem({ categoryId, faqId });
      setFormData({ question: faq.question, answer: faq.answer });
    }
  };

  // Save FAQ
  const saveFAQ = () => {
    if (!content || !editingItem) return;
    
    setContent({
      ...content,
      categories: content.categories.map(cat => {
        if (cat.id === editingItem.categoryId) {
          if (editingItem.faqId) {
            // Update existing FAQ
            return {
              ...cat,
              faqs: cat.faqs.map(faq =>
                faq.id === editingItem.faqId
                  ? { ...faq, question: formData.question, answer: formData.answer }
                  : faq
              ),
            };
          } else {
            // Add new FAQ
            return {
              ...cat,
              faqs: [...cat.faqs, {
                id: Date.now().toString(),
                question: formData.question,
                answer: formData.answer,
              }],
            };
          }
        }
        return cat;
      }),
    });
    
    setEditingItem(null);
    setFormData({ question: '', answer: '' });
  };

  // Delete FAQ
  const deleteFAQ = (categoryId: string, faqId: string) => {
    if (!content) return;
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    setContent({
      ...content,
      categories: content.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, faqs: cat.faqs.filter(faq => faq.id !== faqId) }
          : cat
      ),
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-600">Loading FAQ content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-red-600">Failed to load FAQ content</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">FAQ Content</h1>
          <p className="text-sm text-gray-500">Manage frequently asked questions and categories</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-800">
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Add Category Button */}
      <div className="mb-6">
        <button
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {content.categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Category Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {expandedCategories.has(category.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={category.slug}
                      onChange={(e) => updateCategory(category.id, 'slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <select
                      value={category.icon}
                      onChange={(e) => updateCategory(category.id, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => addFAQ(category.id)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add FAQ
              </button>
            </div>

            {/* FAQs */}
            {expandedCategories.has(category.id) && (
              <div className="p-6 space-y-4">
                {category.faqs.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No FAQs in this category</p>
                ) : (
                  category.faqs.map((faq) => (
                    <div key={faq.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => editFAQ(category.id, faq.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit FAQ"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteFAQ(category.id, faq.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit FAQ Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem.faqId ? 'Edit FAQ' : 'Add FAQ'}
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setFormData({ question: '', answer: '' });
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the answer..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({ question: '', answer: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFAQ}
                  disabled={!formData.question || !formData.answer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingItem.faqId ? 'Update FAQ' : 'Add FAQ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
