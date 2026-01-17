'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface LegalContent {
  content: string;
  lastUpdated?: string;
}

export default function LegalEditor() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const [privacyContent, setPrivacyContent] = useState('');
  const [termsContent, setTermsContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch content
  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const [privacyRes, termsRes] = await Promise.all([
        fetch('/api/admin/pages/privacy', { credentials: 'include' }),
        fetch('/api/admin/pages/terms', { credentials: 'include' }),
      ]);

      if (privacyRes.ok) {
        const privacyData = await privacyRes.json();
        setPrivacyContent(privacyData.content?.content || '');
      }

      if (termsRes.ok) {
        const termsData = await termsRes.json();
        setTermsContent(termsData.content?.content || '');
      }
    } catch (error: any) {
      setError('Failed to load legal content');
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
      const endpoint = activeTab === 'privacy' ? '/api/admin/pages/privacy' : '/api/admin/pages/terms';
      const content = activeTab === 'privacy' ? privacyContent : termsContent;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save ${activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}`);
      }

      setSuccess(`${activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} saved successfully!`);
      setTimeout(() => setSuccess(''), 5000);
    } catch (error: any) {
      setError(error.message || 'Failed to save content');
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

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-600">Loading legal content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Legal Pages</h1>
          <p className="text-sm text-gray-500">Edit Privacy Policy and Terms of Service content</p>
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

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'privacy'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'terms'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Content Editor */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {activeTab === 'privacy' ? 'Privacy Policy Content' : 'Terms of Service Content'}
            </label>
            <p className="text-xs text-gray-500 mb-4">
              Use Markdown syntax for formatting. Links, headings, lists, and bold/italic text are supported.
            </p>
          </div>

          <textarea
            value={activeTab === 'privacy' ? privacyContent : termsContent}
            onChange={(e) => {
              if (activeTab === 'privacy') {
                setPrivacyContent(e.target.value);
              } else {
                setTermsContent(e.target.value);
              }
            }}
            rows={25}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder={`Enter ${activeTab === 'privacy' ? 'privacy policy' : 'terms of service'} content here...`}
          />

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Markdown Quick Reference</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong># Heading 1</strong> - Main heading</p>
              <p><strong>## Heading 2</strong> - Subheading</p>
              <p><strong>**bold text**</strong> - Bold text</p>
              <p><strong>*italic text*</strong> - Italic text</p>
              <p><strong>- List item</strong> - Bullet list</p>
              <p><strong>1. List item</strong> - Numbered list</p>
              <p><strong>[Link text](https://url.com)</strong> - Hyperlink</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
