import { NextResponse } from 'next/server';
import { getTransactionsBySenderWalletAddress } from '@/lib/transaction';

export async function GET(request: Request, { params }: any) {
  // Await the params object
  const { address } = await params;

  try {
    const transactions = await getTransactionsBySenderWalletAddress(address);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(Error(`fetching transactions for sender ${address}`), error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}