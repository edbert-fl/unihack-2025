import { NextResponse } from "next/server";
import {
  getTransactionById,
  Transaction,
  updateTransaction,
} from "@/lib/transaction";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;

    const transaction = await getTransactionById(resolvedParams.id);

    if (!transaction) {
      const URL = `https://api.etherscan.io/v2/api
                  ?chainid=1
                  &module=account
                  &action=txlist
                  &address=${resolvedParams.id}
                  &startblock=0
                  &endblock=99999999
                  &page=1
                  &offset=10
                  &sort=asc
                  &apikey=${process.env.ETHERSCAN_API_KEY}`

      const response = await fetch(URL);
      const data = await response.json();

      if (data.status !== 1) {
        return NextResponse.json(
          { message: "Error fetching transaction" },
          { status: 500 }
        );
      }

      return NextResponse.json(data.result);
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching transaction" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request, { params }: any) {
  try {
    const transactionData = (await request.json()) as Transaction;

    // Check if transaction exists
    const existingTransaction = await getTransactionById(params.id);
    if (!existingTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Update transaction
    const result = await updateTransaction(params.id, transactionData);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to update transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error updating transaction ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}
