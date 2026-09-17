import { requireAdmin } from '@/lib/auth/require-admin';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

/**
 * Admin layout — Server Component.
 *
 * Calls requireAdmin() which redirects to /404 if the user is not logged in
 * or does not have role = 'admin'. This hides the existence of the admin panel
 * from unauthorized users.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdmin();

  return (
    <div className="min-h-screen bg-tazcal-background">
      <AdminSidebar profile={profile} />
      <div className="lg:pl-64">
        <div className="px-4 py-6 pt-20 sm:px-6 lg:pt-6">{children}</div>
      </div>
    </div>
  );
}
