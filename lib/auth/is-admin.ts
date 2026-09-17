import { getCurrentUser } from './get-current-user';

/**
 * Returns true if the current user is logged in AND has role = 'admin'.
 * Returns false for unauthenticated users or non-admin users.
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const current = await getCurrentUser();
    if (!current) return false;
    return current.profile.role === 'admin';
  } catch (error) {
    console.error('isAdmin error:', error);
    return false;
  }
}
