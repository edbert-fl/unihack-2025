import { NextResponse } from 'next/server';
import { getAllCharities } from '@/lib/charity';

export async function GET() {
  try {
    const charities = await getAllCharities();
    return NextResponse.json(charities);
  } catch (error) {
    console.error('Error fetching charities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch charities' },
      { status: 500 }
    );
  }
} 