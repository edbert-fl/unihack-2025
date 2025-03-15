import { NextResponse } from 'next/server';
import { getCharitiesByCategory } from '@/lib/charity';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const charities = await getCharitiesByCategory(params.category);
    return NextResponse.json(charities);
  } catch (error) {
    console.error(`Error fetching charities for category ${params.category}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch charities by category' },
      { status: 500 }
    );
  }
} 