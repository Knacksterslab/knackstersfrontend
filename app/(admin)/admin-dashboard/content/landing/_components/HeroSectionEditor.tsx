'use client';

import React from 'react';
import type { LandingContent, TalentCard } from '../types';

interface HeroSectionEditorProps {
  hero: LandingContent['hero'];
  onUpdate: (field: string, value: string) => void;
  onUpdateCard: (index: number, field: string, value: string) => void;
  onUploadImage: (index: number, file: File) => void;
}

export function HeroSectionEditor({ hero, onUpdate, onUpdateCard, onUploadImage }: HeroSectionEditorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
      <div className="space-y-6">
        <div className="space-y-4 pb-4 border-b border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
            <input type="text" value={hero.headline} onChange={e => onUpdate('headline', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Main headline text" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
            <textarea value={hero.subheadline} onChange={e => onUpdate('subheadline', e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Supporting description text" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
            <input type="text" value={hero.ctaButtonText} onChange={e => onUpdate('ctaButtonText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Button text" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Talent Cards (Carousel)</h3>
          <p className="text-sm text-gray-500">Cards 1-3 appear on the LEFT carousel, Cards 4-6 appear on the RIGHT carousel</p>
          {hero.talentCards.map((card, index) => (
            <TalentCardRow key={card.id} card={card} index={index} onUpdate={(field, value) => onUpdateCard(index, field, value)} onUpload={file => onUploadImage(index, file)} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TalentCardRowProps {
  card: TalentCard;
  index: number;
  onUpdate: (field: string, value: string) => void;
  onUpload: (file: File) => void;
}

function TalentCardRow({ card, index, onUpdate, onUpload }: TalentCardRowProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-700">Talent Card {index + 1}</h4>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${index < 3 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
          {index < 3 ? 'Left Carousel' : 'Right Carousel'}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" value={card.name} onChange={e => onUpdate('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="e.g., John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input type="text" value={card.role} onChange={e => onUpdate('role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="e.g., Developer" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {card.image && <img src={card.image} alt={card.name} className="w-24 h-32 object-cover rounded-lg border border-gray-300" />}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={e => { const file = e.target.files?.[0]; if (file) onUpload(file); }}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-2">Recommended: 3:4 aspect ratio (e.g., 600x800px)</p>
              {card.image && <p className="text-xs text-gray-600 mt-1">Current: {card.image}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
