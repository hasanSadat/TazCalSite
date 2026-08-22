import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/about-page';

export const metadata: Metadata = {
  title: 'About — Our Story, Mission & Vision',
  description: 'Why Tazcal was built, our mission, and where we\'re heading.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <AboutPage />;
}
