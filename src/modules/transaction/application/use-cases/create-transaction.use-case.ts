import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_REPOSITORY, TransactionRepository } from '../../domain/transaction.repository';
import { Transaction } from '../../domain/transaction.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateTransactionUseCase {
    constructor(
        @Inject(TRANSACTION_REPOSITORY)
        private readonly repository: TransactionRepository,
    ) { }

    async execute(fromWalletId: string, toWalletId: string, amount: number): Promise<void> {
        const transaction = new Transaction(
            uuid(),
            fromWalletId,
            toWalletId,
            amount,
            new Date()
        );

        await this.repository.create(transaction);
    }
}
