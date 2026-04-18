'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Save, RefreshCw, CheckCircle, AlertCircle, Plus, Info } from 'lucide-react';
import { useAutoReset } from '@/hooks/useAutoReset';
import { adminApi } from '@/lib/api/client';
import { MetricRow, TestimonialRow, type Metric, type Testimonial } from '@/components/admin/content/SocialProofRows';

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

export default function SocialProofEditor() {
  const [content, setContent] = useState<SocialProofContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  useAutoReset(success, () => setSuccess(''), 6000);
  useAutoReset(error, () => setError(''), 6000);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await adminApi.getSocialProofContent();
      if (res.success && res.data?.content) setContent(res.data.content as SocialProofContent);
    } catch {
      // first time — use defaults
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
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const updateMetric = (idx: number, field: keyof Metric, val: string | boolean) => {
    setContent(prev => { const metrics = [...prev.metrics]; metrics[idx] = { ...metrics[idx], [field]: val }; return { ...prev, metrics }; });
  };

  const addMetric = () => {
    setContent(prev => ({ ...prev, metrics: [...prev.metrics, { id: `metric-${Date.now()}`, value: '', label: '', visible: true }] }));
  };

  const removeMetric = (idx: number) => {
    setContent(prev => ({ ...prev, metrics: prev.metrics.filter((_, i) => i !== idx) }));
  };

  const updateTestimonial = (idx: number, field: keyof Testimonial, val: string | boolean) => {
    setContent(prev => { const testimonials = [...prev.testimonials]; testimonials[idx] = { ...testimonials[idx], [field]: val }; return { ...prev, testimonials }; });
  };

  const addTestimonial = () => {
    setContent(prev => ({ ...prev, testimonials: [...prev.testimonials, { id: `testimonial-${Date.now()}`, quote: '', author: '', role: '', company: '', visible: true }] }));
  };

  const removeTestimonial = (idx: number) => {
    setContent(prev => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== idx) }));
  };

  if (isLoading) return <div className="max-w-4xl mx-auto px-6 py-8 text-gray-500">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Social Proof &amp; Metrics</h1>
          <p className="text-sm text-gray-500">Manage transparent outcome metrics and client testimonials shown on the landing page.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { fetchContent(); setSuccess(''); setError(''); }} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50">
            <RefreshCw className="w-4 h-4" />Reset
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50">
            <Save className="w-5 h-5" />{isSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 text-blue-800 text-sm">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>Toggle metrics <strong>visible/hidden</strong> to control what appears on the live site. Changes go live within ~60 seconds.</span>
      </div>

      {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-800"><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>{success}</span></div>}
      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800"><AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>{error}</span></div>}

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Section Settings</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={content.visible} onChange={e => setContent(p => ({ ...p, visible: e.target.checked }))} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Show section on landing page</span>
            </label>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Headline</label>
              <input type="text" value={content.headline} onChange={e => setContent(p => ({ ...p, headline: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder='e.g., "Results our clients actually see"' />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub-headline / Data source note</label>
              <input type="text" value={content.subheadline} onChange={e => setContent(p => ({ ...p, subheadline: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder='"Based on our first 50 clients" or "Updated Q1 2026"' />
              <p className="mt-1 text-xs text-gray-400">Use this to add credibility context — be specific and honest.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Outcome Metrics</h2>
              <p className="text-sm text-gray-500 mt-0.5">Each metric shows as a large number + label. Toggle off to hide without deleting.</p>
            </div>
            <button onClick={addMetric} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold">
              <Plus className="w-4 h-4" />Add Metric
            </button>
          </div>
          {content.metrics.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No metrics yet — click "Add Metric" to add one.</p>
          ) : (
            <div className="space-y-4">
              {content.metrics.map((metric, idx) => (
                <MetricRow key={metric.id} metric={metric} index={idx} onUpdate={(field, val) => updateMetric(idx, field, val)} onRemove={() => removeMetric(idx)} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Client Testimonials</h2>
              <p className="text-sm text-gray-500 mt-0.5">Named quotes from real clients with their company attribution.</p>
            </div>
            <button onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold">
              <Plus className="w-4 h-4" />Add Testimonial
            </button>
          </div>
          {content.testimonials.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No testimonials yet.</p>
          ) : (
            <div className="space-y-4">
              {content.testimonials.map((t, idx) => (
                <TestimonialRow key={t.id} testimonial={t} index={idx} onUpdate={(field, val) => updateTestimonial(idx, field, val)} onRemove={() => removeTestimonial(idx)} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button onClick={() => { fetchContent(); setSuccess(''); setError(''); }} disabled={isSaving} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50">Reset Changes</button>
        <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50">
          <Save className="w-5 h-5" />{isSaving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
