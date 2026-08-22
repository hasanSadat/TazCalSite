import type { Metadata } from 'next';
import { LoginPage } from '@/components/pages/login-page';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Tazcal account.',
  alternates: { canonical: '/login' },
};

export default function Page() {
  return <LoginPage />;
}
