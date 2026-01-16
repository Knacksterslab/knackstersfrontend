'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface LandingContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaButtonText: string;
    talentCards: Array<{
      id: string;
      image: string;
      name: string;
      role: string;
    }>;
  };
  statistics: {
    professionals: string;
    professionalsLabel: string;
    hoursDelivered: string;
    hoursDeliveredLabel: string;
  };
  partners: {
    title: string;
    description: string;
  };
  solutions: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      icon: 'calendar' | 'customer-service' | 'development' | 'design' | 'marketing' | 'ai-brain' | 'shield' | 'healthcare';
    }>;
    ctaCard: {
      title: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  benefits: {
    title: string;
    subtitle: string;
  };
  useCases: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  seo: {
    pageTitle: string;
    metaDescription: string;
  };
}

export default function LandingPageEditor() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch content
  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load content');
      }
      
      setContent(data.content);
    } catch (error: any) {
      setError(error.message || 'Failed to load content');
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
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save content');
      }

      setSuccess('Content saved successfully! Changes will appear on the landing page.');
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

  // Update nested content
  const updateContent = (section: keyof LandingContent, field: string, value: string) => {
    if (!content) return;
    
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    });
  };

  // Update service item
  const updateServiceItem = (index: number, field: string, value: string) => {
    if (!content) return;
    
    const updatedItems = [...content.solutions.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    
    setContent({
      ...content,
      solutions: {
        ...content.solutions,
        items: updatedItems,
      },
    });
  };

  // Update services CTA card
  const updateServicesCTA = (field: string, value: string) => {
    if (!content) return;
    
    setContent({
      ...content,
      solutions: {
        ...content.solutions,
        ctaCard: {
          ...content.solutions.ctaCard,
          [field]: value,
        },
      },
    });
  };

  // Update talent card
  const updateTalentCard = (index: number, field: string, value: string) => {
    if (!content) return;
    
    const updatedCards = [...content.hero.talentCards];
    updatedCards[index] = {
      ...updatedCards[index],
      [field]: value,
    };
    
    setContent({
      ...content,
      hero: {
        ...content.hero,
        talentCards: updatedCards,
      },
    });
  };

  // Upload talent card image
  const uploadTalentImage = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('destination', 'talent'); // Specify talent destination

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      updateTalentCard(index, 'image', data.url);
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message || 'Failed to upload image');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-600">Loading content...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-red-600">Failed to load content</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Landing Page Content</h1>
          <p className="text-sm text-gray-500">Edit text and content displayed on the homepage</p>
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

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
          
          <div className="space-y-6">
            {/* Section Header */}
            <div className="space-y-4 pb-4 border-b border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={(e) => updateContent('hero', 'headline', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Main headline text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheadline
                </label>
                <textarea
                  value={content.hero.subheadline}
                  onChange={(e) => updateContent('hero', 'subheadline', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Supporting description text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={content.hero.ctaButtonText}
                  onChange={(e) => updateContent('hero', 'ctaButtonText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Button text"
                />
              </div>
            </div>

            {/* Talent Cards Carousel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Talent Cards (Carousel)</h3>
              <p className="text-sm text-gray-500">Cards 1-3 appear on the LEFT carousel, Cards 4-6 appear on the RIGHT carousel</p>
              
              {content.hero.talentCards.map((card, index) => (
                <div key={card.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-semibold text-gray-700">Talent Card {index + 1}</h4>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${index < 3 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {index < 3 ? 'Left Carousel' : 'Right Carousel'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => updateTalentCard(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="e.g., John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={card.role}
                        onChange={(e) => updateTalentCard(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="e.g., Developer"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image
                      </label>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {card.image && (
                            <img
                              src={card.image}
                              alt={card.name}
                              className="w-24 h-32 object-cover rounded-lg border border-gray-300"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                uploadTalentImage(index, file);
                              }
                            }}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Recommended: 3:4 aspect ratio (e.g., 600x800px)
                          </p>
                          {card.image && (
                            <p className="text-xs text-gray-600 mt-1">
                              Current: {card.image}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Metric 1</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number
                </label>
                <input
                  type="text"
                  value={content.statistics.professionals}
                  onChange={(e) => updateContent('statistics', 'professionals', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 9,999+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={content.statistics.professionalsLabel}
                  onChange={(e) => updateContent('statistics', 'professionalsLabel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Metric 2</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number
                </label>
                <input
                  type="text"
                  value={content.statistics.hoursDelivered}
                  onChange={(e) => updateContent('statistics', 'hoursDelivered', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 960,000+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={content.statistics.hoursDeliveredLabel}
                  onChange={(e) => updateContent('statistics', 'hoursDeliveredLabel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Partners Section</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.partners.title}
                onChange={(e) => updateContent('partners', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={content.partners.description}
                onChange={(e) => updateContent('partners', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Solutions Section</h2>
          
          <div className="space-y-6">
            {/* Section Header */}
            <div className="space-y-4 pb-4 border-b border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={content.solutions.title}
                  onChange={(e) => updateContent('solutions', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Our Solutions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <textarea
                  value={content.solutions.subtitle}
                  onChange={(e) => updateContent('solutions', 'subtitle', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of solutions"
                />
              </div>
            </div>

            {/* Service Items */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Solution Cards</h3>
              
              {content.solutions.items.map((service, index) => (
                <div key={service.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-md font-semibold text-gray-700">Service {index + 1}</h4>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                      {service.icon}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateServiceItem(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateServiceItem(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={service.buttonText}
                        onChange={(e) => updateServiceItem(index, 'buttonText', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={service.buttonLink}
                        onChange={(e) => updateServiceItem(index, 'buttonLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="#"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon Type
                      </label>
                      <select
                        value={service.icon}
                        onChange={(e) => updateServiceItem(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="calendar">Calendar (Workflow)</option>
                        <option value="customer-service">Customer Service</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Services CTA Card</h3>
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Title
                  </label>
                  <input
                    type="text"
                    value={content.solutions.ctaCard.title}
                    onChange={(e) => updateServicesCTA('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.solutions.ctaCard.buttonText}
                    onChange={(e) => updateServicesCTA('buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Button Link
                  </label>
                  <input
                    type="text"
                    value={content.solutions.ctaCard.buttonLink}
                    onChange={(e) => updateServicesCTA('buttonLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="#"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits Section</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.benefits.title}
                onChange={(e) => updateContent('benefits', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Why Choose Us?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <textarea
                value={content.benefits.subtitle}
                onChange={(e) => updateContent('benefits', 'subtitle', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of benefits"
              />
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Use Cases Section</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.useCases.title}
                onChange={(e) => updateContent('useCases', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Explore Our Use Cases"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <textarea
                value={content.useCases.subtitle}
                onChange={(e) => updateContent('useCases', 'subtitle', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of use cases"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={content.seo.pageTitle}
                onChange={(e) => updateContent('seo', 'pageTitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Page title for SEO"
              />
              <p className="mt-1 text-xs text-gray-500">Appears in browser tab and search results (50-60 characters)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={content.seo.metaDescription}
                onChange={(e) => updateContent('seo', 'metaDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description for search engines"
              />
              <p className="mt-1 text-xs text-gray-500">Appears in search results (150-160 characters)</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Call to Action (Bottom)</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.cta.title}
                onChange={(e) => updateContent('cta', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={content.cta.description}
                onChange={(e) => updateContent('cta', 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={content.cta.buttonText}
                onChange={(e) => updateContent('cta', 'buttonText', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          onClick={handleReset}
          disabled={isSaving}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
        >
          Reset Changes
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
