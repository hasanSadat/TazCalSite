import type { Metadata } from 'next';
import { FeaturesPage } from '@/components/pages/features-page';

export const metadata: Metadata = {
  title: 'Features — Everything Tazcal Does',
  description:
    'Full documentation of every Tazcal capability: Dynamic Calories, AI Food, AI Planner, Planner, Habits, Goals, Journal, and Analytics.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'Features — Tazcal',
    description: 'Full documentation of every Tazcal capability.',
    url: '/features',
  },
};

export default function Page() {
  return <FeaturesPage />;
}
