import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('studio_auth')?.value;
  const secret = process.env.STUDIO_SECRET;

  if (!secret || cookie !== secret) {
    return NextResponse.redirect(new URL('/studio-login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*'],
};
