import { NextResponse } from 'next/server';
import { getCharityById } from '@/lib/charity';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const charity = await getCharityById(params.id);
    
    if (!charity) {
      return NextResponse.json(
        { error: 'Charity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(charity);
  } catch (error) {
    console.error(`Error fetching charity ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch charity' },
      { status: 500 }
    );
  }
} 