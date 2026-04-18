'use client';

import React from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';

export interface Metric {
  id: string;
  value: string;
  label: string;
  visible: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  visible: boolean;
}

interface MetricRowProps {
  metric: Metric;
  index: number;
  onUpdate: (field: keyof Metric, val: string | boolean) => void;
  onRemove: () => void;
}

export function MetricRow({ metric, index, onUpdate, onRemove }: MetricRowProps) {
  return (
    <div className={`border rounded-lg p-4 ${metric.visible ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Metric {index + 1}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate('visible', !metric.visible)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-colors ${metric.visible ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            {metric.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {metric.visible ? 'Visible' : 'Hidden'}
          </button>
          <button onClick={onRemove} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
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
            onChange={e => onUpdate('value', e.target.value)}
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
            onChange={e => onUpdate('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder='e.g., "of trial clients convert to paid"'
          />
        </div>
      </div>
    </div>
  );
}

interface TestimonialRowProps {
  testimonial: Testimonial;
  index: number;
  onUpdate: (field: keyof Testimonial, val: string | boolean) => void;
  onRemove: () => void;
}

export function TestimonialRow({ testimonial: t, index, onUpdate, onRemove }: TestimonialRowProps) {
  return (
    <div className={`border rounded-lg p-4 ${t.visible ? 'border-gray-200' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Testimonial {index + 1}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate('visible', !t.visible)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-colors ${t.visible ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            {t.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {t.visible ? 'Visible' : 'Hidden'}
          </button>
          <button onClick={onRemove} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
          <textarea
            value={t.quote}
            onChange={e => onUpdate('quote', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            placeholder="The client's exact words…"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author name</label>
            <input type="text" value={t.author} onChange={e => onUpdate('author', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="e.g., James K." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
            <input type="text" value={t.role} onChange={e => onUpdate('role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="e.g., CTO" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input type="text" value={t.company} onChange={e => onUpdate('company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="e.g., Cirklu Security" />
          </div>
        </div>
      </div>
    </div>
  );
}
