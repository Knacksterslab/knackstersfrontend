'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useAutoReset } from '@/hooks/useAutoReset';
import { FAQEditModal } from '@/components/admin/content/FAQEditModal';
import { FAQCategoryCard, type FAQCategory } from '@/components/admin/content/FAQCategoryCard';

interface FAQContent {
  categories: FAQCategory[];
}

export default function FAQEditor() {
  const [content, setContent] = useState<FAQContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  useAutoReset(success, () => setSuccess(''), 5000);
  useAutoReset(error, () => setError(''), 5000);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<{ categoryId: string; faqId: string | null } | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/pages/faq', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to load FAQ content');
      const data = await response.json();
      setContent(data.content || { categories: [] });
    } catch (err: any) {
      setError(err.message || 'Failed to load FAQ content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchContent(); }, []);

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
      if (!response.ok) throw new Error('Failed to save FAQ content');
      setSuccess('FAQ content saved successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to save FAQ content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to discard all changes?')) {
      fetchContent();
      setSuccess('');
      setError('');
    }
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    newExpanded.has(categoryId) ? newExpanded.delete(categoryId) : newExpanded.add(categoryId);
    setExpandedCategories(newExpanded);
  };

  const addCategory = () => {
    if (!content) return;
    setContent({
      ...content,
      categories: [...content.categories, { id: Date.now().toString(), title: 'New Category', icon: 'Globe', slug: 'new-category', faqs: [] }],
    });
  };

  const updateCategory = (categoryId: string, field: string, value: string) => {
    if (!content) return;
    setContent({ ...content, categories: content.categories.map(cat => cat.id === categoryId ? { ...cat, [field]: value } : cat) });
  };

  const deleteCategory = (categoryId: string) => {
    if (!content || !confirm('Are you sure you want to delete this category?')) return;
    setContent({ ...content, categories: content.categories.filter(cat => cat.id !== categoryId) });
  };

  const saveFAQ = () => {
    if (!content || !editingItem) return;
    setContent({
      ...content,
      categories: content.categories.map(cat => {
        if (cat.id !== editingItem.categoryId) return cat;
        if (editingItem.faqId) {
          return { ...cat, faqs: cat.faqs.map(faq => faq.id === editingItem.faqId ? { ...faq, ...formData } : faq) };
        }
        return { ...cat, faqs: [...cat.faqs, { id: Date.now().toString(), ...formData }] };
      }),
    });
    setEditingItem(null);
    setFormData({ question: '', answer: '' });
  };

  const deleteFAQ = (categoryId: string, faqId: string) => {
    if (!content || !confirm('Are you sure you want to delete this FAQ?')) return;
    setContent({ ...content, categories: content.categories.map(cat => cat.id === categoryId ? { ...cat, faqs: cat.faqs.filter(faq => faq.id !== faqId) } : cat) });
  };

  if (isLoading) return <div className="max-w-7xl mx-auto px-6 py-8"><p className="text-gray-600">Loading FAQ content...</p></div>;
  if (!content) return <div className="max-w-7xl mx-auto px-6 py-8"><p className="text-red-600">Failed to load FAQ content</p></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">FAQ Content</h1>
          <p className="text-sm text-gray-500">Manage frequently asked questions and categories</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleReset} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50">
            <RefreshCw className="w-4 h-4" />Reset
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50">
            <Save className="w-5 h-5" />{isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-800">
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>{error}</span>
        </div>
      )}

      <div className="mb-6">
        <button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Plus className="w-4 h-4" />Add Category
        </button>
      </div>

      <div className="space-y-6">
        {content.categories.map(category => (
          <FAQCategoryCard
            key={category.id}
            category={category}
            isExpanded={expandedCategories.has(category.id)}
            onToggle={() => toggleCategory(category.id)}
            onUpdate={(field, value) => updateCategory(category.id, field, value)}
            onDelete={() => deleteCategory(category.id)}
            onAddFAQ={() => { setEditingItem({ categoryId: category.id, faqId: null }); setFormData({ question: '', answer: '' }); }}
            onEditFAQ={faqId => {
              const faq = category.faqs.find(f => f.id === faqId);
              if (faq) { setEditingItem({ categoryId: category.id, faqId }); setFormData({ question: faq.question, answer: faq.answer }); }
            }}
            onDeleteFAQ={faqId => deleteFAQ(category.id, faqId)}
          />
        ))}
      </div>

      {editingItem && (
        <FAQEditModal
          editingItem={editingItem}
          formData={formData}
          onFormChange={setFormData}
          onSave={saveFAQ}
          onClose={() => { setEditingItem(null); setFormData({ question: '', answer: '' }); }}
        />
      )}
    </div>
  );
}
