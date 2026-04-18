'use client';

import React from 'react';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  slug: string;
  faqs: FAQItem[];
}

const AVAILABLE_ICONS = [
  'Globe', 'Award', 'DollarSign', 'Zap', 'Clock', 'Shield',
  'Users', 'FileText', 'CreditCard', 'CheckCircle2',
];

interface FAQCategoryCardProps {
  category: FAQCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: string, value: string) => void;
  onDelete: () => void;
  onAddFAQ: () => void;
  onEditFAQ: (faqId: string) => void;
  onDeleteFAQ: (faqId: string) => void;
}

export function FAQCategoryCard({
  category,
  isExpanded,
  onToggle,
  onUpdate,
  onDelete,
  onAddFAQ,
  onEditFAQ,
  onDeleteFAQ,
}: FAQCategoryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
          </button>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={category.title}
                onChange={e => onUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={category.slug}
                onChange={e => onUpdate('slug', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <select
                value={category.icon}
                onChange={e => onUpdate('icon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {AVAILABLE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
          </div>
          <button onClick={onDelete} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete category">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={onAddFAQ}
          className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-4">
          {category.faqs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No FAQs in this category</p>
          ) : (
            category.faqs.map(faq => (
              <div key={faq.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEditFAQ(faq.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit FAQ">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDeleteFAQ(faq.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete FAQ">
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
  );
}
