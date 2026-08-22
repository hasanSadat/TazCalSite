import type { Metadata } from 'next';
import { ProfilePage } from '@/components/pages/profile-page';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your Tazcal account profile.',
  alternates: { canonical: '/profile' },
};

export default function Page() {
  return <ProfilePage />;
}
