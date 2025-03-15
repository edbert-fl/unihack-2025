import { NextResponse } from 'next/server';
import { 
  getAllSuccessfulTransactions,
  getAllFailedTransactions,
  getAllPendingTransactions
} from '@/lib/transaction';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status')?.toLowerCase();

    let transactions;
    
    switch (status) {
      case 'success':
        transactions = await getAllSuccessfulTransactions();
        break;
      case 'failed':
        transactions = await getAllFailedTransactions();
        break;
      case 'pending':
        transactions = await getAllPendingTransactions();
        break;
      default:
        return NextResponse.json(
          { error: "Invalid status parameter. Use 'success', 'failed', or 'pending'" },
          { status: 400 }
        );
    }
    
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions by status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
} 