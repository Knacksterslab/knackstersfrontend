"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/lib/api/client";
import { useAutoReset } from "@/hooks/useAutoReset";
import { useRouter } from "next/navigation";
import { TalentCardEditor, type TalentCard } from "@/components/admin/content/TalentCardEditor";

const DEFAULT_CARDS: TalentCard[] = [
  { id: "talent-1", image: "/images/1767310859581-san-woman.jpg", name: "Katlego", role: "Runner" },
  { id: "talent-2", image: "/images/people-image-2.png", name: "Talent 2", role: "Designer" },
  { id: "talent-3", image: "/images/people-image-3.png", name: "Talent 3", role: "Manager" },
  { id: "talent-4", image: "/images/people-image-1.png", name: "Talent 4", role: "Developer" },
  { id: "talent-5", image: "/images/people-image-2.png", name: "Talent 5", role: "Marketer" },
  { id: "talent-6", image: "/images/people-image-3.png", name: "Talent 6", role: "Analyst" },
];

export default function HeroContentEditor() {
  const router = useRouter();
  const [talentCards, setTalentCards] = useState<TalentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useAutoReset(success, () => setSuccess(null), 3000);
  useAutoReset(error, () => setError(null), 5000);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { loadContent(); }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getLandingHero();
      if (response.success && response.data?.content?.talentCards) {
        setTalentCards(response.data.content.talentCards);
      } else {
        setTalentCards(DEFAULT_CARDS);
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
      if (talentCards.length !== 6) {
        setError("You must have exactly 6 talent cards (3 for each carousel)");
        return;
      }
      await adminApi.updateLandingHero(talentCards);
      setSuccess("Hero section updated successfully!");
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
        setTalentCards(cards => cards.map(card => card.id === cardId ? { ...card, image: response.url } : card));
        setSuccess("Image uploaded successfully!");
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
    if (talentCards.length >= 6) { setError("Maximum 6 talent cards allowed"); return; }
    const newCard: TalentCard = { id: `talent-${Date.now()}`, image: "/images/people-image-1.png", name: "New Talent", role: "Role" };
    setTalentCards([...talentCards, newCard]);
  };

  const handleDeleteCard = (cardId: string) => {
    if (talentCards.length <= 6) { setError("You need at least 6 cards for the carousel"); return; }
    setTalentCards(cards => cards.filter(card => card.id !== cardId));
  };

  const handleUpdateCard = (cardId: string, updates: Partial<TalentCard>) => {
    setTalentCards(cards => cards.map(card => card.id === cardId ? { ...card, ...updates } : card));
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
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </div>
    );
  }

  const leftCarousel = talentCards.slice(0, 3);
  const rightCarousel = talentCards.slice(3, 6);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Section - Talent Cards</h1>
        <p className="text-gray-600">Manage the talent cards displayed in the animated carousel. The first 3 cards appear in the left carousel, the last 3 in the right.</p>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Left Carousel (Cards 1-3)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leftCarousel.map((card, index) => (
            <TalentCardEditor
              key={card.id}
              card={card}
              index={index}
              totalCards={talentCards.length}
              onUpdate={updates => handleUpdateCard(card.id, updates)}
              onImageUpload={file => handleImageUpload(file, card.id)}
              onDelete={() => handleDeleteCard(card.id)}
              onMoveUp={() => moveCard(index, 'up')}
              onMoveDown={() => moveCard(index, 'down')}
              uploading={uploading}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Right Carousel (Cards 4-6)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rightCarousel.map((card, index) => (
            <TalentCardEditor
              key={card.id}
              card={card}
              index={index + 3}
              totalCards={talentCards.length}
              onUpdate={updates => handleUpdateCard(card.id, updates)}
              onImageUpload={file => handleImageUpload(file, card.id)}
              onDelete={() => handleDeleteCard(card.id)}
              onMoveUp={() => moveCard(index + 3, 'up')}
              onMoveDown={() => moveCard(index + 3, 'down')}
              uploading={uploading}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
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
