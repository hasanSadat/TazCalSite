import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';
import type { ProfileRow } from '@/lib/supabase/types';

export interface CurrentUserResult {
  user: User;
  profile: ProfileRow;
}

/**
 * Returns the currently authenticated user and their profile row.
 * If the user is not logged in, or the profile row cannot be found, returns null.
 */
export async function getCurrentUser(): Promise<CurrentUserResult | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return null;
    }

    return { user, profile: profile as ProfileRow };
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
}
