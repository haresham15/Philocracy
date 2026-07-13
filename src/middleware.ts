import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that should not be redirected
  const isMaintenancePath = pathname.startsWith('/maintenance');
  const isAdminPath = pathname.startsWith('/admin');
  const isApiPath = pathname.startsWith('/api');
  const isPublicFile = pathname.includes('.') && !pathname.endsWith('.html'); // Simple check for assets like .css, .js, .png, etc.

  if (isMaintenancePath || isAdminPath || isApiPath || isPublicFile) {
    return NextResponse.next();
  }

  // Redirect all other traffic to /maintenance
  const maintenanceUrl = new URL('/maintenance', request.url);
  return NextResponse.redirect(maintenanceUrl);
}

// Optionally, configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
