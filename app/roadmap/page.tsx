import type { Metadata } from 'next';
import { RoadmapPage } from '@/components/pages/roadmap-page';

export const metadata: Metadata = {
  title: 'Roadmap — Where Tazcal Is Heading',
  description: 'A timeline of future Tazcal capabilities and features.',
  alternates: { canonical: '/roadmap' },
};

export default function Page() {
  return <RoadmapPage />;
}
