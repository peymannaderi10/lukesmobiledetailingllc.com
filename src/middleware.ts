import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of image file extensions to apply caching to
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.pathname;

  // Check if the current request is for an image file
  const isImageFile = IMAGE_EXTENSIONS.some(ext => url.toLowerCase().endsWith(ext));

  if (isImageFile) {
    // Add cache-control headers for images - 30 days (2592000 seconds)
    response.headers.set('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=86400');
    response.headers.set('Expires', new Date(Date.now() + 2592000 * 1000).toUTCString());
  }

  return response;
}

// Only match image file paths
export const config = {
  matcher: [
    '/Images/:path*',
    '/android-chrome-:path*',
    '/apple-touch-icon:path*',
    '/favicon:path*',
    '/:path*.jpg',
    '/:path*.jpeg',
    '/:path*.png',
    '/:path*.gif',
    '/:path*.webp',
    '/:path*.svg',
    '/:path*.ico',
  ],
}; 