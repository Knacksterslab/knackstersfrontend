'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';
import { adminApi } from '@/lib/api/client';

interface Metric {
  id: string;
  value: string;
  label: string;
  visible: boolean;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  visible: boolean;
}

interface SocialProofContent {
  headline: string;
  subheadline: string;
  visible: boolean;
  metrics: Metric[];
  testimonials: Testimonial[];
}

const DEFAULT_CONTENT: SocialProofContent = {
  headline: 'Results our clients actually see',
  subheadline: 'Based on our client base since launch',
  visible: true,
  metrics: [],
  testimonials: [],
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function SocialProofEditor() {
  const [content, setContent] = useState<SocialProofContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await adminApi.getSocialProofContent();
      if (res.success && res.data?.content) {
        setContent(res.data.content as SocialProofContent);
      }
    } catch {
      // first time — use defaults (row already seeded)
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      await adminApi.updateSocialProofContent(content);
      setSuccess('Saved! Changes will appear on the landing page within ~60 seconds.');
      setTimeout(() => setSuccess(''), 6000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  // ── Metric helpers ──────────────────────────────────────────────────────────
  const updateMetric = (idx: number, field: keyof Metric, val: string | boolean) => {
    setContent(prev => {
      const metrics = [...prev.metrics];
      metrics[idx] = { ...metrics[idx], [field]: val };
      return { ...prev, metrics };
    });
  };

  const addMetric = () => {
    setContent(prev => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        { id: `metric-${Date.now()}`, value: '', label: '', visible: true },
      ],
    }));
  };

  const removeMetric = (idx: number) => {
    setContent(prev => ({ ...prev, metrics: prev.metrics.filter((_, i) => i !== idx) }));
  };

  // ── Testimonial helpers ─────────────────────────────────────────────────────
  const updateTestimonial = (idx: number, field: keyof Testimonial, val: string | boolean) => {
    setContent(prev => {
      const testimonials = [...prev.testimonials];
      testimonials[idx] = { ...testimonials[idx], [field]: val };
      return { ...prev, testimonials };
    });
  };

  const addTestimonial = () => {
    setContent(prev => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { id: `testimonial-${Date.now()}`, quote: '', author: '', role: '', company: '', visible: true },
      ],
    }));
  };

  const removeTestimonial = (idx: number) => {
    setContent(prev => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== idx) }));
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto px-6 py-8 text-gray-500">Loading…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Social Proof &amp; Metrics</h1>
          <p className="text-sm text-gray-500">
            Manage transparent outcome metrics and client testimonials shown on the landing page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchContent(); setSuccess(''); setError(''); }}
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
            {isSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 text-blue-800 text-sm">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>
          Values are entered manually. Toggle metrics <strong>visible/hidden</strong> to control what appears on the live site. Changes go live within ~60 seconds.
        </span>
      </div>

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

      <div className="space-y-6">

        {/* Section settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Section Settings</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={content.visible}
                onChange={e => setContent(p => ({ ...p, visible: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Show section on landing page</span>
            </label>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Headline</label>
              <input
                type="text"
                value={content.headline}
                onChange={e => setContent(p => ({ ...p, headline: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Results our clients actually see"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-headline / Data source note
              </label>
              <input
                type="text"
                value={content.subheadline}
                onChange={e => setContent(p => ({ ...p, subheadline: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder='e.g., "Based on our first 50 clients" or "Updated Q1 2026"'
              />
              <p className="mt-1 text-xs text-gray-400">Use this to add credibility context — be specific and honest.</p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Outcome Metrics</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Each metric shows as a large number + label. Toggle off to hide without deleting.
              </p>
            </div>
            <button
              onClick={addMetric}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Metric
            </button>
          </div>

          {content.metrics.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No metrics yet — click "Add Metric" to add one.</p>
          ) : (
            <div className="space-y-4">
              {content.metrics.map((metric, idx) => (
                <div
                  key={metric.id}
                  className={`border rounded-lg p-4 ${metric.visible ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Metric {idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateMetric(idx, 'visible', !metric.visible)}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                          metric.visible
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {metric.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {metric.visible ? 'Visible' : 'Hidden'}
                      </button>
                      <button
                        onClick={() => removeMetric(idx)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value <span className="text-gray-400 font-normal">(the big number)</span>
                      </label>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={e => updateMetric(idx, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder='e.g., "78%", "< 48h", "4.9 / 5"'
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label <span className="text-gray-400 font-normal">(description below the value)</span>
                      </label>
                      <input
                        type="text"
                        value={metric.label}
                        onChange={e => updateMetric(idx, 'label', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder='e.g., "of trial clients convert to paid"'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Client Testimonials</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Named quotes from real clients with their company attribution.
              </p>
            </div>
            <button
              onClick={addTestimonial}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </button>
          </div>

          {content.testimonials.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No testimonials yet.</p>
          ) : (
            <div className="space-y-4">
              {content.testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className={`border rounded-lg p-4 ${t.visible ? 'border-gray-200' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Testimonial {idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTestimonial(idx, 'visible', !t.visible)}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                          t.visible
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {t.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {t.visible ? 'Visible' : 'Hidden'}
                      </button>
                      <button
                        onClick={() => removeTestimonial(idx)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                      <textarea
                        value={t.quote}
                        onChange={e => updateTestimonial(idx, 'quote', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                        placeholder="The client's exact words…"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author name</label>
                        <input
                          type="text"
                          value={t.author}
                          onChange={e => updateTestimonial(idx, 'author', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="e.g., James K."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
                        <input
                          type="text"
                          value={t.role}
                          onChange={e => updateTestimonial(idx, 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="e.g., CTO"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={t.company}
                          onChange={e => updateTestimonial(idx, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="e.g., Cirklu Security"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom save */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          onClick={() => { fetchContent(); setSuccess(''); setError(''); }}
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
          {isSaving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
