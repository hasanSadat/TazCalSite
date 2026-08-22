import type { Metadata } from 'next';
import { LegalPage } from '@/components/pages/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions for using Tazcal.',
  alternates: { canonical: '/terms' },
};

export default function Page() {
  return <LegalPage title="footer.terms" sections={termsSections} />;
}

// app/privacy/page.tsx
// app/terms/page.tsx
const termsSections = [
  { 
    id: 'overview', 
    titleKey: 'terms.overview.title', 
    bodyKey: 'terms.overview.body' 
  },
  { 
    id: 'acceptance', 
    titleKey: 'terms.acceptance.title', 
    bodyKey: 'terms.acceptance.body' 
  },
  { 
    id: 'use-of-service', 
    titleKey: 'terms.useOfService.title', 
    bodyKey: 'terms.useOfService.body' 
  },
  { 
    id: 'accounts', 
    titleKey: 'terms.accounts.title', 
    bodyKey: 'terms.accounts.body' 
  },
  { 
    id: 'subscriptions', 
    titleKey: 'terms.subscriptions.title', 
    bodyKey: 'terms.subscriptions.body' 
  },
  { 
    id: 'liability', 
    titleKey: 'terms.liability.title', 
    bodyKey: 'terms.liability.body' 
  },
  { 
    id: 'contact', 
    titleKey: 'terms.contact.title', 
    bodyKey: 'terms.contact.body' 
  },
];