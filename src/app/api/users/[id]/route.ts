import { NextResponse } from 'next/server';
import { getUserById } from '@/lib/user';

export async function GET(
  request: Request,
  { params }: any
) {
  try {
    const user = await getUserById(params.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Don't return the passwordHash in the API response
    const { passwordHash, ...safeUserData } = user;
    
    return NextResponse.json(safeUserData);
  } catch (error) {
    console.error(`Error fetching user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
} 