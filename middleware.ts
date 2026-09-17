import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Root middleware — runs on every request.
 *
 * 1. Refreshes the Supabase auth session (cookie sync).
 * 2. Protects /admin routes — redirects unauthenticated users to /login?redirect=/admin.
 * 3. Protects /profile routes — redirects unauthenticated users to /login.
 */
export async function middleware(request: NextRequest) {
  const { supabase, response } = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirect', '/admin');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Protect /profile routes
  if (pathname.startsWith('/profile')) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2|woff|ttf)$).*)',
  ],
};
