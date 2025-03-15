import { NextResponse } from 'next/server';
import { getAllTransactions, createTransaction } from '@/lib/transaction';

export async function GET() {
  try {
    const transactions = await getAllTransactions();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const transactionData = await request.json();
    
    // Basic validation
    if (!transactionData.amount || !transactionData.recepientWalletAddress || !transactionData.senderWalletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Set default values if not provided
    const transaction = {
      transactionTime: transactionData.transactionTime || new Date().toISOString(),
      transactionStatus: transactionData.transactionStatus || 'Pending',
      ...transactionData
    };
    
    const result = await createTransaction(transaction);
    
    return NextResponse.json(
      result,
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
} 