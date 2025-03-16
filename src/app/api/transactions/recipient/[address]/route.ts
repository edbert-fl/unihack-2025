import { NextResponse } from "next/server";
import { getTransactionsByRecipientWalletAddress } from "@/lib/transaction";

export async function GET(
  request: Request,
  { params }: any
) {
  try {
    // Get transactions by recipient wallet address
    const transactions = await getTransactionsByRecipientWalletAddress(
      params.address
    );

    // If no transactions found, you might want to return a 404
    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        { message: `No transactions found for address: ${params.address}` },
        { status: 404 }
      );
    }

    // Return the fetched transactions
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(
      `Error fetching transactions for recipient ${params.address}:`,
      error
    );

    // Return a 500 internal server error response if something went wrong
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
