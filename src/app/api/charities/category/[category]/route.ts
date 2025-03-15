import { NextResponse } from 'next/server';
import { getCharitiesByCategory } from '@/lib/charity';

export async function GET({ params }: any) {
  try {
    const categoryName = params.category;
    const charities = await getCharitiesByCategory(categoryName);
    return NextResponse.json(charities);
  } catch (error) {
    console.error(`Error fetching charities for category ${params.category}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch charities by category' },
      { status: 500 }
    );
  }
} 