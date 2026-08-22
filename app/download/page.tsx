import type { Metadata } from 'next';
import { DownloadPage } from '@/components/pages/download-page';

export const metadata: Metadata = {
  title: 'Download Tazcal',
  description: 'Download Tazcal from Google Play, Myket, Cafe Bazaar. App Store coming soon.',
  alternates: { canonical: '/download' },
};

export default function Page() {
  return <DownloadPage />;
}
