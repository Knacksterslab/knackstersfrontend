'use client';

import { useEffect } from 'react';
import { initSuperTokensFrontend } from '@/lib/supertokens/frontend-init';

export default function SuperTokensProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initSuperTokensFrontend();
  }, []);

  return <>{children}</>;
}
