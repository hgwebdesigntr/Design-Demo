import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStudio =
    pathname === '/studio' || pathname.startsWith('/studio/');

  if (isStudio) {
    const cookie = request.cookies.get('studio_auth')?.value;
    const secret = process.env.STUDIO_SECRET;

    if (!secret || cookie !== secret) {
      return NextResponse.redirect(new URL('/studio-login', request.url));
    }
  }

  return NextResponse.next();
}
