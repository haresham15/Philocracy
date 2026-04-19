import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (isAdminPath && !isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    
    // In production, ADMIN_PASSWORD must be strictly set
    if (!authCookie || authCookie.value.trim() !== process.env.ADMIN_PASSWORD?.trim()) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect /admin directly to /admin/orders
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/orders', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
