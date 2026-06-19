import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    username === process.env.STUDIO_USERNAME &&
    password === process.env.STUDIO_PASSWORD
  ) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'studio_auth',
      value: process.env.STUDIO_SECRET!,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
