'use client'

/**
 * User Context
 * Single source of truth for authenticated user data across the app.
 * Exposes updateProfile and uploadAvatar so all profile pages
 * share one update path and the UI (TopBar, ProfileDropdown, etc.)
 * reflects changes instantly without a full page reload.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import { authApi, userApi } from '@/lib/api/client';
import { cropToSquare } from '@/lib/utils/image';

interface User {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  avatarUrl?: string;
  phone?: string;
  companyName?: string;
  bio?: string;
  timezone?: string;
}

interface UpdateProfileData {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  bio?: string;
  timezone?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  /** Update profile fields and sync global user state immediately. */
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  /** Crop and upload a profile photo, sync avatar URL globally. */
  uploadAvatar: (file: File) => Promise<string>;
  /** Remove the current avatar. */
  removeAvatar: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const sessionExists = await Session.doesSessionExist();
      if (!sessionExists) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await authApi.getSession();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (err: any) {
      console.error('User fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await Session.signOut();
      setUser(null);
      setError(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileData) => {
    const res = await userApi.updateProfile(data);
    if (res.success && res.data?.profile) {
      // Merge updated fields into the global user state immediately
      setUser((prev) =>
        prev
          ? {
              ...prev,
              fullName: res.data.profile.fullName ?? prev.fullName,
              phone: res.data.profile.phone ?? prev.phone,
              companyName: res.data.profile.companyName ?? prev.companyName,
              bio: res.data.profile.bio ?? prev.bio,
              timezone: res.data.profile.timezone ?? prev.timezone,
            }
          : prev
      );
    } else {
      throw new Error((res as any).error || 'Failed to update profile');
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    const blob = await cropToSquare(file);
    const res = await userApi.uploadAvatar(blob);
    if (res.success && res.data?.avatarUrl) {
      setUser((prev) => (prev ? { ...prev, avatarUrl: res.data.avatarUrl } : prev));
      return res.data.avatarUrl as string;
    }
    throw new Error((res as any).error || 'Failed to upload avatar');
  };

  const removeAvatar = async () => {
    await userApi.removeAvatar();
    setUser((prev) => (prev ? { ...prev, avatarUrl: undefined } : prev));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, refresh: fetchUser, logout, updateProfile, uploadAvatar, removeAvatar }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
