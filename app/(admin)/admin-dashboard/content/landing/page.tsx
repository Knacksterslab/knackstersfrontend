'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useAutoReset } from '@/hooks/useAutoReset';
import type { LandingContent } from './types';
import { HeroSectionEditor } from './_components/HeroSectionEditor';
import { SolutionsSectionEditor } from './_components/SolutionsSectionEditor';
import { StatisticsSection, PartnersSection, TwoFieldSection, SeoSection } from './_components/SimpleSections';

export default function LandingPageEditor() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  useAutoReset(success, () => setSuccess(''), 5000);
  useAutoReset(error, () => setError(''), 5000);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to load content');
      setContent(data.content);
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
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
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save content');
      setSuccess('Content saved successfully! Changes will appear on the landing page.');
    } catch (err: any) {
      setError(err.message || 'Failed to save content');
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

  const updateContent = (section: keyof LandingContent, field: string, value: string) => {
    if (!content) return;
    setContent({ ...content, [section]: { ...(content[section] as object), [field]: value } });
  };

  const updateServiceItem = (index: number, field: string, value: string) => {
    if (!content) return;
    const updatedItems = [...content.solutions.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value } as typeof updatedItems[number];
    setContent({ ...content, solutions: { ...content.solutions, items: updatedItems } });
  };

  const updateServicesCTA = (field: string, value: string) => {
    if (!content) return;
    setContent({ ...content, solutions: { ...content.solutions, ctaCard: { ...content.solutions.ctaCard, [field]: value } } });
  };

  const updateTalentCard = (index: number, field: string, value: string) => {
    if (!content) return;
    const updatedCards = [...content.hero.talentCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setContent({ ...content, hero: { ...content.hero, talentCards: updatedCards } });
  };

  const uploadTalentImage = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('destination', 'talent');
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Failed to upload image');
      const data = await response.json();
      updateTalentCard(index, 'image', data.url);
      setSuccess('Image uploaded successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    }
  };

  if (isLoading) return <div className="max-w-7xl mx-auto px-6 py-8"><p className="text-gray-600">Loading content...</p></div>;
  if (!content) return <div className="max-w-7xl mx-auto px-6 py-8"><p className="text-red-600">Failed to load content</p></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Landing Page Content</h1>
          <p className="text-sm text-gray-500">Edit text and content displayed on the homepage</p>
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

      {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-800"><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>{success}</span></div>}
      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800"><AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>{error}</span></div>}

      <div className="space-y-6">
        <HeroSectionEditor
          hero={content.hero}
          onUpdate={(field, value) => updateContent('hero', field, value)}
          onUpdateCard={updateTalentCard}
          onUploadImage={uploadTalentImage}
        />
        <StatisticsSection statistics={content.statistics} onUpdate={updateContent} />
        <PartnersSection partners={content.partners} onUpdate={updateContent} />
        <SolutionsSectionEditor
          solutions={content.solutions}
          onUpdate={(field, value) => updateContent('solutions', field, value)}
          onUpdateItem={updateServiceItem}
          onUpdateCTA={updateServicesCTA}
        />
        <TwoFieldSection title="Benefits Section" field1Label="Title" field1Key="title" field1Value={content.benefits.title} field2Label="Subtitle" field2Key="subtitle" field2Value={content.benefits.subtitle} section="benefits" onUpdate={updateContent} />
        <TwoFieldSection title="Use Cases Section" field1Label="Title" field1Key="title" field1Value={content.useCases.title} field2Label="Subtitle" field2Key="subtitle" field2Value={content.useCases.subtitle} section="useCases" onUpdate={updateContent} />
        <SeoSection seo={content.seo} onUpdate={updateContent} />
        <TwoFieldSection title="Call to Action (Bottom)" field1Label="Title" field1Key="title" field1Value={content.cta.title} field2Label="Description" field2Key="description" field2Value={content.cta.description} section="cta" onUpdate={updateContent} field2Rows={2} />
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button onClick={handleReset} disabled={isSaving} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50">Reset Changes</button>
        <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50">
          <Save className="w-5 h-5" />{isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
