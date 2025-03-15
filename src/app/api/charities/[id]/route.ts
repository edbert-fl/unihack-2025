import { NextRequest, NextResponse } from 'next/server';
import { getCharityById } from '@/lib/charity';

export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const charity = await getCharityById(context.params.id);
    
    if (!charity) {
      return NextResponse.json(
        { error: 'Charity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(charity);
  } catch (error) {
    console.error(`Error fetching charity ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch charity' },
      { status: 500 }
    );
  }
} 