// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
// import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { LocaleProvider } from '@/components/providers/locale-provider';
import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import { MeshBackground } from '@/components/layout/mesh-background';

// فقط فونت‌های اینتر و عربی از گوگل فونت
// const inter = Inter({ 
//   subsets: ['latin'], 
//   variable: '--font-inter', 
//   display: 'swap',
//   weight: ['400', '500', '600', '700'] 
// });

// const arabic = IBM_Plex_Sans_Arabic({ 
//   weight: ['400', '500', '600', '700'], 
//   subsets: ['arabic', 'latin'], 
//   variable: '--font-arabic', 
//   display: 'swap' 
// });
// app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL('https://tazcal.com'),
  title: {
    default: 'Tazcal — Your Health. Planned by AI.',
    template: '%s | Tazcal',
  },
  description:
    'Tazcal is a premium AI-powered Health Operating System that connects nutrition, planning, habits, goals, journaling, and analytics — powered by AI that removes manual effort from daily life.',
  keywords: ['Tazcal', 'AI health', 'calorie tracking', 'meal planner', 'habit tracker', 'health OS', 'nutrition AI'],
  openGraph: {
    type: 'website',
    url: 'https://tazcal.com',
    title: 'Tazcal — Your Health. Planned by AI.',
    description:
      'A premium AI-powered Health Operating System that connects nutrition, planning, habits, goals, journaling, and analytics.',
    siteName: 'Tazcal',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tazcal — Your Health. Planned by AI.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tazcal — Your Health. Planned by AI.',
    description: 'A premium AI-powered Health Operating System.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  // متا تگ اختصاصی برای اپل (اختیاری)
  appleWebApp: {
    capable: true,
    title: 'TazCal',
    statusBarStyle: 'default',
  },
  applicationName: 'TazCal',
};

// ... بقیه کد layout

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tazcal',
  url: 'https://tazcal.com',
  description:
    'Tazcal is a premium AI-powered Health Operating System that connects nutrition, planning, habits, goals, journaling, and analytics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body 
        className={`antialiased`}
        style={{ 
          fontFamily: "'Vazirmatn', var(--font-inter), var(--font-arabic), system-ui, sans-serif" 
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LocaleProvider>
          <MeshBackground />
          <NavBar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}