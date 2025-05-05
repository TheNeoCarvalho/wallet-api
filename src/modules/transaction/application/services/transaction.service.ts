import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionRepository } from '../../domain/transaction.repository';
import { Transaction } from '../../domain/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) { }

    async create(walletId: string, amount: number, description: string): Promise<Transaction> {
        const transaction = new Transaction(uuidv4(), walletId, amount, description, new Date());
        return this.transactionRepository.create(transaction);
    }

    async revert(transactionId: string): Promise<Transaction> {
        const transaction = await this.transactionRepository.findById(transactionId);
        if (!transaction) throw new NotFoundException('Transaction not found');

        if (transaction.isReverted) {
            throw new BadRequestException('Transaction has already been reverted');
        }

        transaction.revert();
        return this.transactionRepository.update(transaction);
    }
}
