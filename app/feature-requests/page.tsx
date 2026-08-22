import type { Metadata } from 'next';
import { FeatureRequestsPage } from '@/components/pages/feature-requests-page';

export const metadata: Metadata = {
  title: 'Feature Requests',
  description: 'Submit and vote on features you want to see in Tazcal.',
  alternates: { canonical: '/feature-requests' },
};

export default function Page() {
  return <FeatureRequestsPage />;
}
