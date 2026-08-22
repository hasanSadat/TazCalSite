import type { Metadata } from 'next';
import { ChangelogPage } from '@/components/pages/changelog-page';

export const metadata: Metadata = {
  title: 'Changelog — What\'s New',
  description: 'Version history and updates for Tazcal. See what\'s changed in each release.',
  alternates: { canonical: '/changelog' },
};

export default function Page() {
  return <ChangelogPage />;
}
