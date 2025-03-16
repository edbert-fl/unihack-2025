export interface Transaction {
    target: string
    charity: string
    amount: string
    currency: string
    impact: string
    time: string
    status: string
    flag: boolean
}
  
export interface WalletData {
    profileImage?: string
    coverPhoto?: string
    walletAddress: string
    username?: string
    firstTransaction: string
    lastTransaction: string
    transactions: Transaction[],
}
  
  