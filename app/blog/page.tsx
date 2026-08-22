import type { Metadata } from 'next';
import { BlogIndexPage } from '@/components/pages/blog-index-page';

export const metadata: Metadata = {
  title: 'Blog — Health, Nutrition & Productivity',
  description: 'Articles on weight loss, TDEE, MET, protein intake, habit building, and more.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
  return <BlogIndexPage />;
}
