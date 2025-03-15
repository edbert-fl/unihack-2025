import { NextResponse } from 'next/server';
import { getTransactionsBySenderWalletAddress } from '@/lib/transaction';

export async function GET(
  request: Request,
  { params }: any
) {
  try {
    const transactions = await getTransactionsBySenderWalletAddress(params.address);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(`Error fetching transactions for sender ${params.address}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
} 