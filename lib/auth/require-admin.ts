import { redirect } from 'next/navigation';
import { isAdmin } from './is-admin';
import { getCurrentUser } from './get-current-user';
import type { ProfileRow } from '@/lib/supabase/types';

/**
 * Server-side guard for admin-only routes.
 *
 * - If the user is not logged in: redirects to /404 (hides admin existence).
 * - If the user is logged in but not an admin: redirects to /404.
 * - If the user is an admin: returns the admin's profile row.
 *
 * Call this at the top of any Server Component or Server Action that requires admin access.
 */
export async function requireAdmin(): Promise<ProfileRow> {
  const admin = await isAdmin();

  if (!admin) {
    redirect('/404');
  }

  const current = await getCurrentUser();

  if (!current) {
    redirect('/404');
  }

  return current.profile;
}
