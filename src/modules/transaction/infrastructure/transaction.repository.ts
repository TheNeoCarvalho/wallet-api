import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/transaction.repository';
import { Transaction } from '../domain/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
    constructor(
        @InjectRepository(Transaction)
        private readonly repo: Repository<Transaction>,
    ) { }

    async create(transaction: Transaction): Promise<void> {
        const entity = this.repo.create({
            id: transaction.id,
            fromWalletId: transaction.fromWalletId,
            toWalletId: transaction.toWalletId,
            amount: transaction.amount,
            createdAt: transaction.createdAt,
            reverted: transaction.reverted,
        });
        await this.repo.save(entity);
    }

    async findById(id: string): Promise<Transaction | null> {
        const entity = await this.repo.findOne({ where: { id } });
        if (!entity) return null;

        return new Transaction(
            entity.id,
            entity.fromWalletId,
            entity.toWalletId,
            Number(entity.amount),
            entity.createdAt,
            entity.reverted,
        );
    }

    async revert(transactionId: string): Promise<void> {
        const transaction = await this.repo.findOne({ where: { id: transactionId } });
        if (!transaction) {
            throw new Error('Transação não encontrada.');
        }
        if (transaction.reverted) {
            throw new Error('Transação já revertida.');
        }
        await this.repo.update(transactionId, { reverted: true });
    }
}
