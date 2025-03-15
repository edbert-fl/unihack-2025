import { NextResponse } from 'next/server';
import { searchCharities } from '@/lib/charity'; // Assuming you have a function that searches based on a query

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    console.log(url)
    const query = url.searchParams.get('query') || '';

    // If query is empty, return an empty array or all charities
    if (!query.trim()) {
      return NextResponse.json({ charities: [] });
    }

    // Fetch charities based on the search query
    const charities = await searchCharities(query); // Implement this function in your lib

    return NextResponse.json({ charities });
  } catch (error) {
    console.error('Error fetching charities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch charities' },
      { status: 500 }
    );
  }
}