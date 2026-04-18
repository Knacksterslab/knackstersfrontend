'use client';

import React, { useState } from 'react';

export interface TalentCard {
  id: string;
  image: string;
  name: string;
  role: string;
}

interface TalentCardEditorProps {
  card: TalentCard;
  index: number;
  totalCards: number;
  onUpdate: (updates: Partial<TalentCard>) => void;
  onImageUpload: (file: File) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  uploading: boolean;
}

export function TalentCardEditor({
  card,
  index,
  totalCards,
  onUpdate,
  onImageUpload,
  onDelete,
  onMoveUp,
  onMoveDown,
  uploading,
}: TalentCardEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(card.name);
  const [editRole, setEditRole] = useState(card.role);

  const handleSave = () => {
    onUpdate({ name: editName, role: editRole });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(card.name);
    setEditRole(card.role);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4] bg-gray-100">
        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
        <label className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all cursor-pointer flex items-center justify-center group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-white text-sm mt-2">Click to upload</p>
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white">Uploading...</div>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9414C] focus:border-transparent"
            />
            <input
              type="text"
              value={editRole}
              onChange={e => setEditRole(e.target.value)}
              placeholder="Role"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9414C] focus:border-transparent"
            />
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">Save</button>
              <button onClick={handleCancel} className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900">{card.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{card.role}</p>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="flex-1 px-3 py-2 bg-[#E9414C] text-white rounded-lg text-sm hover:opacity-90 transition-opacity">Edit</button>
              <div className="flex gap-1">
                <button onClick={onMoveUp} disabled={index === 0} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Move up">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={onMoveDown} disabled={index === totalCards - 1} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Move down">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
