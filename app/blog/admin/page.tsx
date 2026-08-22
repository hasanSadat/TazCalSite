import type { Metadata } from 'next';
import { BlogAdminPage } from '@/components/pages/blog-admin-page';

export const metadata: Metadata = {
  title: 'Blog Admin',
  description: 'Manage blog posts.',
  alternates: { canonical: '/blog/admin' },
};

export default function Page() {
  return <BlogAdminPage />;
}
