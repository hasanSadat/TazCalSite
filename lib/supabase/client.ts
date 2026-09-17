import { createBrowserClient } from '@supabase/ssr';

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
 * Supabase client for use in browser (client components).
 * Uses createBrowserClient from @supabase/ssr for proper cookie-based session handling.
 * Replace with createBrowserClient<Database> once generated types are available.
 */
export const createClient = () =>
  createBrowserClient(url, key);
