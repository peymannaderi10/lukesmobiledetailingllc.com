import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Regex to match image file extensions
const STATIC_ASSETS = /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For image files, add cache-control header
  if (STATIC_ASSETS.test(pathname)) {
    // Set a one-week cache for images (604800 seconds)
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=604800, immutable');
    return response;
  }

  // For all other routes, pass through
  return NextResponse.next();
}

// Only run middleware on image paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/Images/:path*',
    '/fonts/:path*',
  ],
}; 