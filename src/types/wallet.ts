export interface Transaction {
    hash: string
    type: string
    amount: string
    date: string
    from: string
    to: string
    status: string
    gasFee: string
    isIncoming: boolean
    message?: string
}
  
export interface WalletData {
    profileImage?: string
    username?: string
    balance: string
    firstTransaction: string
    lastTransaction: string
    transactions: Transaction[]
}
  
  