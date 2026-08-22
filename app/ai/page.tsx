import type { Metadata } from 'next';
import { AIPage } from '@/components/pages/ai-page';

export const metadata: Metadata = {
  title: 'AI — Intelligence Built Into Everything',
  description:
    'A deep dive into Tazcal\'s AI capabilities: AI Food, AI Planner, and the future AI Coach. Natural language in, structured results out.',
  alternates: { canonical: '/ai' },
};

export default function Page() {
  return <AIPage />;
}
