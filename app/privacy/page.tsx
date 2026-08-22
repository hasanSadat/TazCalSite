import type { Metadata } from 'next';
import { LegalPage } from '@/components/pages/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Tazcal handles your data and privacy.',
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return <LegalPage title="footer.privacy" sections={privacySections} />;
}

// app/privacy/page.tsx
const privacySections = [
  { id: 'overview', titleKey: 'privacy.overview.title', bodyKey: 'privacy.overview.body' },
  { id: 'data-collection', titleKey: 'privacy.dataCollection.title', bodyKey: 'privacy.dataCollection.body' },
  { id: 'data-usage', titleKey: 'privacy.dataUsage.title', bodyKey: 'privacy.dataUsage.body' },
  { id: 'data-storage', titleKey: 'privacy.dataStorage.title', bodyKey: 'privacy.dataStorage.body' },
  { id: 'cookies', titleKey: 'privacy.cookies.title', bodyKey: 'privacy.cookies.body' },
  { id: 'your-rights', titleKey: 'privacy.yourRights.title', bodyKey: 'privacy.yourRights.body' },
  { id: 'contact', titleKey: 'privacy.contact.title', bodyKey: 'privacy.contact.body' },
];