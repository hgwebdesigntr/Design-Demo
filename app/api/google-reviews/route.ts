import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json({ rating: null, total: null, reviewerPhotos: [] });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}&language=tr`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ rating: null, total: null, reviewerPhotos: [] });
    }

    const reviewerPhotos: string[] = (data.result?.reviews ?? [])
      .slice(0, 2)
      .map((r: { profile_photo_url?: string }) => r.profile_photo_url ?? '')
      .filter(Boolean);

    return NextResponse.json({
      rating: data.result?.rating ?? null,
      total: data.result?.user_ratings_total ?? null,
      reviewerPhotos,
    });
  } catch {
    return NextResponse.json({ rating: null, total: null, reviewerPhotos: [] });
  }
}
