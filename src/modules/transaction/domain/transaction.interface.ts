import { Transaction } from './transaction.entity';

export interface ITransaction {
    id: string;
    amount: number;
    type: 'credit' | 'debit';
    date: Date;
    walletId: string;
}
