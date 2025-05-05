import { Transaction } from './transaction.entity';

export const TRANSACTION_REPOSITORY = 'TransactionRepository';

export interface ITransactionRepository {
    create(transaction: Transaction): Promise<void>;
}

export abstract class TransactionRepository {
    abstract create(transaction: Transaction): Promise<void>;
    abstract findById(id: string): Promise<Transaction | null>;
    abstract revert(transactionId: string): Promise<void>;
}
