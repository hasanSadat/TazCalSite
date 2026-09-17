import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginPage } from '@/components/pages/login-page';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Tazcal account.',
  alternates: { canonical: '/login' },
};

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-tazcal-primary border-t-transparent" />
      </div>
    }>
      <LoginPage />
    </Suspense>
  );
}
