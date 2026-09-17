import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
  );
}

const url: string = supabaseUrl;
const key: string = supabaseAnonKey;

/**
 * Supabase client for use in Server Components and Server Actions.
 * Reads and writes auth cookies via next/headers for SSR session management.
 * Replace with createServerClient<Database> once generated types are available.
 */
export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The setAll method is called from a Server Component where cookies
          // can only be read, not set. This is safe to ignore when middleware
          // handles session refresh.
        }
      },
    },
  });
}
