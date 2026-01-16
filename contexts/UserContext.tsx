'use client'

/**
 * User Context
 * Single source of truth for user data across the app
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import { authApi } from '@/lib/api/client';

interface User {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  avatarUrl?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
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
      
      // Check if session exists
      const sessionExists = await Session.doesSessionExist();
      if (!sessionExists) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Fetch user data from backend
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
      // Sign out from SuperTokens session
      await Session.signOut();
      // Clear local user state
      setUser(null);
      setError(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, refresh: fetchUser, logout }}>
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
