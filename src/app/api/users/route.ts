import { NextResponse } from 'next/server';
import { createUser } from '@/lib/user';

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    
    // Basic validation
    if (!userData.username || !userData.email || !userData.passwordHash) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const userId = await createUser(userData);
    
    return NextResponse.json(
      { success: true, userId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 