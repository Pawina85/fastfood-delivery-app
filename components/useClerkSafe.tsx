'use client';

import { useUser as useClerkUser, SignInButton as ClerkSignInButton, SignUpButton as ClerkSignUpButton, UserButton as ClerkUserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

// Check if Clerk is properly configured
export const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return key && key.startsWith('pk_') && !key.includes('YOUR_KEY');
};

// Safe wrapper for useUser that returns default values when Clerk is not configured
export function useUser() {
  const clerkConfigured = isClerkConfigured();

  // We need to call the hook unconditionally, but we'll ignore its result if Clerk isn't configured
  // This is a workaround for React's rules of hooks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let clerkResult: { isSignedIn: boolean; isLoaded: boolean; user: any } = {
    isSignedIn: false,
    isLoaded: true,
    user: null
  };

  try {
    if (clerkConfigured) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const result = useClerkUser();
      clerkResult = {
        isSignedIn: result.isSignedIn ?? false,
        isLoaded: result.isLoaded,
        user: result.user ?? null,
      };
    }
  } catch {
    // Clerk not available
  }

  if (!clerkConfigured) {
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
    };
  }

  return clerkResult;
}

// Safe SignInButton wrapper
export function SignInButton({ children, mode }: { children: ReactNode; mode?: 'modal' | 'redirect' }) {
  if (!isClerkConfigured()) {
    return <span onClick={() => alert('Please configure Clerk API keys to enable authentication')}>{children}</span>;
  }
  return <ClerkSignInButton mode={mode}>{children}</ClerkSignInButton>;
}

// Safe SignUpButton wrapper
export function SignUpButton({ children, mode }: { children: ReactNode; mode?: 'modal' | 'redirect' }) {
  if (!isClerkConfigured()) {
    return <span onClick={() => alert('Please configure Clerk API keys to enable authentication')}>{children}</span>;
  }
  return <ClerkSignUpButton mode={mode}>{children}</ClerkSignUpButton>;
}

// Safe UserButton wrapper
interface UserButtonProps {
  afterSignOutUrl?: string;
  appearance?: {
    elements?: {
      avatarBox?: string;
    };
  };
}

export function UserButton({ afterSignOutUrl, appearance }: UserButtonProps) {
  if (!isClerkConfigured()) {
    return null;
  }
  return <ClerkUserButton afterSignOutUrl={afterSignOutUrl} appearance={appearance} />;
}
