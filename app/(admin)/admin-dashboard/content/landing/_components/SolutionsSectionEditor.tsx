'use client';

import React from 'react';
import type { LandingContent } from '../types';

interface SolutionsSectionEditorProps {
  solutions: LandingContent['solutions'];
  onUpdate: (field: string, value: string) => void;
  onUpdateItem: (index: number, field: string, value: string) => void;
  onUpdateCTA: (field: string, value: string) => void;
}

export function SolutionsSectionEditor({ solutions, onUpdate, onUpdateItem, onUpdateCTA }: SolutionsSectionEditorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Solutions Section</h2>
      <div className="space-y-6">
        <div className="space-y-4 pb-4 border-b border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input type="text" value={solutions.title} onChange={e => onUpdate('title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Our Solutions" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
            <textarea value={solutions.subtitle} onChange={e => onUpdate('subtitle', e.target.value)} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief description of solutions" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Solution Cards</h3>
          {solutions.items.map((service, index) => (
            <div key={service.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-md font-semibold text-gray-700">Service {index + 1}</h4>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">{service.icon}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={service.title} onChange={e => onUpdateItem(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={service.description} onChange={e => onUpdateItem(index, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input type="text" value={service.buttonText} onChange={e => onUpdateItem(index, 'buttonText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                  <input type="text" value={service.buttonLink} onChange={e => onUpdateItem(index, 'buttonLink', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="#" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Type</label>
                  <select value={service.icon} onChange={e => onUpdateItem(index, 'icon', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
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

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Services CTA Card</h3>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Title</label>
              <input type="text" value={solutions.ctaCard.title} onChange={e => onUpdateCTA('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
              <input type="text" value={solutions.ctaCard.buttonText} onChange={e => onUpdateCTA('buttonText', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
              <input type="text" value={solutions.ctaCard.buttonLink} onChange={e => onUpdateCTA('buttonLink', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
