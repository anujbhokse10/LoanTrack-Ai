'use client';

import { useEffect, useState } from 'react';
import { AuthForm } from './auth-form';

type AuthFormClientProps = {
  mode: 'login' | 'signup';
};

export function AuthFormClient({ mode }: AuthFormClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render a placeholder or null on the server and initial client render
  if (!isClient) {
    // You can return a loading skeleton here if you prefer
    return null;
  }

  // Render the actual form only on the client
  return <AuthForm mode={mode} />;
}
