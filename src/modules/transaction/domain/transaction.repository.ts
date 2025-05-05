import { Transaction } from './transaction.entity';
import { ITransaction } from './transaction.interface';

export interface TransactionRepository {
    create(transaction: Transaction): Promise<Transaction>;
    update(transaction: Transaction): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findById(id: string): Promise<Transaction | null>;
}
