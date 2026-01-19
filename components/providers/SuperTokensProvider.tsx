'use client';

import { useEffect, useState } from 'react';
import { initSuperTokensFrontend } from '@/lib/supertokens/frontend-init';

export default function SuperTokensProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize SuperTokens
    initSuperTokensFrontend();
    setIsInitialized(true);
  }, []);

  // Wait for initialization before rendering children
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
