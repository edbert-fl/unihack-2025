import { NextResponse } from 'next/server';
import { getTransactionById, updateTransaction } from '@/lib/transaction';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transaction = await getTransactionById(params.id);
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(transaction);
  } catch (error) {
    console.error(`Error fetching transaction ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transactionData = await request.json();
    
    // Check if transaction exists
    const existingTransaction = await getTransactionById(params.id);
    if (!existingTransaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    // Update transaction
    const result = await updateTransaction(params.id, transactionData);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update transaction' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error updating transaction ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
} 