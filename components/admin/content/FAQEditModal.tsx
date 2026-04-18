'use client';

import React from 'react';
import { X } from 'lucide-react';

interface FAQEditModalProps {
  editingItem: { categoryId: string; faqId: string | null };
  formData: { question: string; answer: string };
  onFormChange: (data: { question: string; answer: string }) => void;
  onSave: () => void;
  onClose: () => void;
}

export function FAQEditModal({ editingItem, formData, onFormChange, onSave, onClose }: FAQEditModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingItem.faqId ? 'Edit FAQ' : 'Add FAQ'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={e => onFormChange({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the question..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
            <textarea
              value={formData.answer}
              onChange={e => onFormChange({ ...formData, answer: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the answer..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!formData.question || !formData.answer}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingItem.faqId ? 'Update FAQ' : 'Add FAQ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
