const { transactionCollection } = require('./db');

interface Transaction {
    _id: string;
    transactionTime: string;
    description: string;
    amount: string;
    recepientWalletAddress: string;
    senderWalletAddress: string;
    transactionStatus: string;
}

export async function getAllTransactions(): Promise<Transaction[]> {
    try {
        return await transactionCollection.find({}).toArray() as Transaction[];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }  
}

export async function getTransactionById(id: string): Promise<Transaction | null> {
    try {
        return await transactionCollection.findOne({ _id: id }) as Transaction;
    } catch (error) {
        console.error(`Error fetching transaction ${id}:`, error);
        return null;
    }
}

export async function getTransactionsByRecipientWalletAddress(walletAddress: string): Promise<Transaction[]> {
    try {
        return await transactionCollection.find({ $or: [{ recepientWalletAddress: walletAddress }, { senderWalletAddress: walletAddress }] }).toArray() as Transaction[];
    } catch (error) {
        console.error(`Error fetching transactions for wallet ${walletAddress}:`, error);
        return [];
    }
}

export async function createTransaction(transaction: Transaction): Promise<Transaction> {
    try {
        const result = await transactionCollection.insertOne(transaction);
        return { ...transaction, _id: result.insertedId.toString() } as Transaction;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
}

export async function updateTransaction(id: string, transaction: Transaction): Promise<Transaction | null> {
    try {
        const result = await transactionCollection.updateOne({ _id: id }, { $set: transaction });
        return result.modifiedCount > 0 ? { ...transaction, _id: id } as Transaction : null;
    } catch (error) {
        console.error(`Error updating transaction ${id}:`, error);
        throw error;
    }
}

export async function getTransactionsBySenderWalletAddress(walletAddress: string): Promise<Transaction[]> {
    try {
        return await transactionCollection.find({ senderWalletAddress: walletAddress }).toArray() as Transaction[];
    } catch (error) {
        console.error(`Error fetching transactions for wallet ${walletAddress}:`, error);
        return [];
    }
}

export async function getAllSuccessfulTransactions(): Promise<Transaction[]> {
    try {
        return await transactionCollection.find({ transactionStatus: "Success" }).toArray() as Transaction[];
    } catch (error) {
        console.error('Error fetching successful transactions:', error);
        return [];
    }
}

export async function getAllFailedTransactions(): Promise<Transaction[]> {
    try {
        return await transactionCollection.find({ transactionStatus: "Failed" }).toArray() as Transaction[];
    } catch (error) {
        console.error('Error fetching failed transactions:', error);
        return [];
    }
}

export async function getAllPendingTransactions(): Promise<Transaction[]> {
    try {
        return await transactionCollection.find({ transactionStatus: "Pending" }).toArray() as Transaction[];
    } catch (error) {
        console.error('Error fetching pending transactions:', error);
        return [];
    }
}


