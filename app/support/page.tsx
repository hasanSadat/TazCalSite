import type { Metadata } from 'next';
import { SupportPage } from '@/components/pages/support-page';

export const metadata: Metadata = {
  title: 'Support — Help, FAQ & Contact',
  description: 'Get help with Tazcal. Browse FAQs, contact support, or report a problem.',
  alternates: { canonical: '/support' },
};

export default function Page() {
  return <SupportPage />;
}
