export interface Transaction {
  _id: string;
  transactionTime: string;
  description: string;
  amount: string;
  recepientWalletAddress: string;
  senderWalletAddress: string;
  transactionStatus: string;
}
