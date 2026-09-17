import type { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { redirect } from 'next/navigation';
import { ProfilePage } from '@/components/pages/profile-page';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your Tazcal account profile.',
  alternates: { canonical: '/profile' },
};

export default async function Page() {
  const current = await getCurrentUser();

  if (!current) {
    redirect('/login');
  }

  return <ProfilePage profile={current.profile} email={current.user.email ?? ''} />;
}
