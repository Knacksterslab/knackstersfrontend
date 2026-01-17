"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/lib/api/client";
import { useRouter } from "next/navigation";

interface TalentCard {
  id: string;
  image: string;
  name: string;
  role: string;
}

export default function HeroContentEditor() {
  const router = useRouter();
  const [talentCards, setTalentCards] = useState<TalentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<TalentCard | null>(null);
  const [uploading, setUploading] = useState(false);

  // Load existing content
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getLandingHero();
      
      if (response.success && response.data?.content?.talentCards) {
        setTalentCards(response.data.content.talentCards);
      } else {
        // Load default cards if none exist
        setTalentCards([
          {
            id: "talent-1",
            image: "/images/1767310859581-san-woman.jpg",
            name: "Katlego",
            role: "Runner"
          },
          {
            id: "talent-2",
            image: "/images/people-image-2.png",
            name: "Talent 2",
            role: "Designer"
          },
          {
            id: "talent-3",
            image: "/images/people-image-3.png",
            name: "Talent 3",
            role: "Manager"
          },
          {
            id: "talent-4",
            image: "/images/people-image-1.png",
            name: "Talent 4",
            role: "Developer"
          },
          {
            id: "talent-5",
            image: "/images/people-image-2.png",
            name: "Talent 5",
            role: "Marketer"
          },
          {
            id: "talent-6",
            image: "/images/people-image-3.png",
            name: "Talent 6",
            role: "Analyst"
          }
        ]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // Validate
      if (talentCards.length !== 6) {
        setError("You must have exactly 6 talent cards (3 for each carousel)");
        return;
      }

      await adminApi.updateLandingHero(talentCards);
      setSuccess("Hero section updated successfully!");
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, cardId: string) => {
    try {
      setUploading(true);
      setError(null);
      
      const response = await adminApi.uploadFile(file, 'talent');
      
      if (response.success && response.url) {
        // Update the card with the new image URL
        setTalentCards(cards =>
          cards.map(card =>
            card.id === cardId ? { ...card, image: response.url } : card
          )
        );
        setSuccess("Image uploaded successfully!");
        setTimeout(() => setSuccess(null), 2000);
      } else {
        setError("Failed to upload image");
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddCard = () => {
    if (talentCards.length >= 6) {
      setError("Maximum 6 talent cards allowed");
      return;
    }
    
    const newCard: TalentCard = {
      id: `talent-${Date.now()}`,
      image: "/images/people-image-1.png",
      name: "New Talent",
      role: "Role"
    };
    
    setTalentCards([...talentCards, newCard]);
    setEditingCard(newCard);
  };

  const handleDeleteCard = (cardId: string) => {
    if (talentCards.length <= 6) {
      setError("You need at least 6 cards for the carousel");
      return;
    }
    setTalentCards(cards => cards.filter(card => card.id !== cardId));
  };

  const handleUpdateCard = (cardId: string, updates: Partial<TalentCard>) => {
    setTalentCards(cards =>
      cards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
      )
    );
  };

  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newCards = [...talentCards];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newCards.length) return;
    
    [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
    setTalentCards(newCards);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const leftCarousel = talentCards.slice(0, 3);
  const rightCarousel = talentCards.slice(3, 6);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hero Section - Talent Cards
        </h1>
        <p className="text-gray-600">
          Manage the talent cards displayed in the animated carousel on the home page.
          The first 3 cards appear in the left carousel, the last 3 in the right carousel.
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      {/* Left Carousel Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Left Carousel (Cards 1-3)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leftCarousel.map((card, index) => (
            <TalentCardEditor
              key={card.id}
              card={card}
              index={index}
              totalCards={talentCards.length}
              onUpdate={(updates) => handleUpdateCard(card.id, updates)}
              onImageUpload={(file) => handleImageUpload(file, card.id)}
              onDelete={() => handleDeleteCard(card.id)}
              onMoveUp={() => moveCard(index, 'up')}
              onMoveDown={() => moveCard(index, 'down')}
              uploading={uploading}
            />
          ))}
        </div>
      </div>

      {/* Right Carousel Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Right Carousel (Cards 4-6)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rightCarousel.map((card, index) => (
            <TalentCardEditor
              key={card.id}
              card={card}
              index={index + 3}
              totalCards={talentCards.length}
              onUpdate={(updates) => handleUpdateCard(card.id, updates)}
              onImageUpload={(file) => handleImageUpload(file, card.id)}
              onDelete={() => handleDeleteCard(card.id)}
              onMoveUp={() => moveCard(index + 3, 'up')}
              onMoveDown={() => moveCard(index + 3, 'down')}
              uploading={uploading}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="px-8 py-2 bg-gradient-to-r from-[#E9414C] to-[#FC8838] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// Individual Card Editor Component
function TalentCardEditor({
  card,
  index,
  totalCards,
  onUpdate,
  onImageUpload,
  onDelete,
  onMoveUp,
  onMoveDown,
  uploading,
}: {
  card: TalentCard;
  index: number;
  totalCards: number;
  onUpdate: (updates: Partial<TalentCard>) => void;
  onImageUpload: (file: File) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  uploading: boolean;
}) {
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
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-gray-100">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover"
        />
        
        {/* Upload overlay */}
        <label className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all cursor-pointer flex items-center justify-center group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-white text-sm mt-2">Click to upload</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
        
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white">Uploading...</div>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9414C] focus:border-transparent"
            />
            <input
              type="text"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              placeholder="Role"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9414C] focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900">{card.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{card.role}</p>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-3 py-2 bg-[#E9414C] text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Edit
              </button>
              
              <div className="flex gap-1">
                <button
                  onClick={onMoveUp}
                  disabled={index === 0}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={onMoveDown}
                  disabled={index === totalCards - 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
