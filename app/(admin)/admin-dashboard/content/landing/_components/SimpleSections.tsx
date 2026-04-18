'use client';

import React from 'react';
import type { LandingContent } from '../types';

type UpdateFn = (section: keyof LandingContent, field: string, value: string) => void;

interface StatisticsSectionProps {
  statistics: LandingContent['statistics'];
  onUpdate: UpdateFn;
}

export function StatisticsSection({ statistics, onUpdate }: StatisticsSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Metric 1</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
            <input type="text" value={statistics.professionals} onChange={e => onUpdate('statistics', 'professionals', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 10,002+" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <input type="text" value={statistics.professionalsLabel} onChange={e => onUpdate('statistics', 'professionalsLabel', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Description" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Metric 2</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
            <input type="text" value={statistics.hoursDelivered} onChange={e => onUpdate('statistics', 'hoursDelivered', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 961,400+" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <input type="text" value={statistics.hoursDeliveredLabel} onChange={e => onUpdate('statistics', 'hoursDeliveredLabel', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Description" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PartnersSectionProps {
  partners: LandingContent['partners'];
  onUpdate: UpdateFn;
}

export function PartnersSection({ partners, onUpdate }: PartnersSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Partners Section</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input type="text" value={partners.title} onChange={e => onUpdate('partners', 'title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea value={partners.description} onChange={e => onUpdate('partners', 'description', e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
    </div>
  );
}

interface TwoFieldSectionProps {
  title: string;
  field1Label: string;
  field1Key: string;
  field1Value: string;
  field2Label: string;
  field2Key: string;
  field2Value: string;
  section: keyof LandingContent;
  onUpdate: UpdateFn;
  field2Rows?: number;
}

export function TwoFieldSection({ title, field1Label, field1Key, field1Value, field2Label, field2Key, field2Value, section, onUpdate, field2Rows = 2 }: TwoFieldSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{field1Label}</label>
          <input type="text" value={field1Value} onChange={e => onUpdate(section, field1Key, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{field2Label}</label>
          <textarea value={field2Value} onChange={e => onUpdate(section, field2Key, e.target.value)} rows={field2Rows} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
    </div>
  );
}

interface SeoSectionProps {
  seo: LandingContent['seo'];
  onUpdate: UpdateFn;
}

export function SeoSection({ seo, onUpdate }: SeoSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
          <input type="text" value={seo.pageTitle} onChange={e => onUpdate('seo', 'pageTitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Page title for SEO" />
          <p className="mt-1 text-xs text-gray-500">Appears in browser tab and search results (50-60 characters)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
          <textarea value={seo.metaDescription} onChange={e => onUpdate('seo', 'metaDescription', e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief description for search engines" />
          <p className="mt-1 text-xs text-gray-500">Appears in search results (150-160 characters)</p>
        </div>
      </div>
    </div>
  );
}
