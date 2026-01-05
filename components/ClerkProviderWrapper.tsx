'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return key && key.startsWith('pk_') && !key.includes('YOUR_KEY');
};

export default function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  // If Clerk is not configured, just render children without ClerkProvider
  if (!isClerkConfigured()) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
