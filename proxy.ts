import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/studio')) {
    const cookie = request.cookies.get('studio_auth')?.value;
    const secret = process.env.STUDIO_SECRET;

    if (!secret || cookie !== secret) {
      return NextResponse.redirect(new URL('/studio-login', request.url));
    }
  }

  return NextResponse.next();
}
