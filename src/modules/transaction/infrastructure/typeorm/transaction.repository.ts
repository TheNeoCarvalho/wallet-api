import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../../domain/transaction.entity';
import { TransactionRepository } from '../../domain/transaction.repository';
import { Transaction as TransactionEntity } from './transaction.entity';

@Injectable()
export class TypeOrmTransactionRepository implements TransactionRepository {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>
    ) { }

    async create(transaction: Transaction): Promise<Transaction> {
        try {
            return await this.transactionRepository.save(transaction);
        } catch (error) {
            console.error('Erro ao salvar a transação:', error);
            throw new Error('Não foi possível salvar a transação');
        }
    }
    async findAll(): Promise<Transaction[]> {
        try {
            return await this.transactionRepository.find().then(transactions => transactions.map(transaction => new Transaction(transaction.id, transaction.amount, transaction.type as 'credit' | 'debit', transaction.date, transaction.walletId)));
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
            throw new Error('Não foi possível buscar as transações');
        }
    }

    async findById(id: string): Promise<Transaction | null> {
        try {
            const transaction = await this.transactionRepository.findOne({ where: { id } });
            if (!transaction) {
                throw new Error('Transação não encontrada');
            }
            return new Transaction(transaction.id, transaction.amount, transaction.type as 'credit' | 'debit', transaction.date, transaction.walletId);
        } catch (error) {
            console.error('Erro ao buscar transação:', error);
            throw new Error('Não foi possível buscar a transação');
        }
    }

    async update(transaction: Transaction): Promise<Transaction> {
        try {
            const existingTransaction = await this.transactionRepository.findOne({ where: { id: transaction.id } });
            if (!existingTransaction) {
                throw new Error('Transação não encontrada');
            }

            existingTransaction.amount = transaction.amount;
            existingTransaction.walletId = transaction.walletId;

            return await this.transactionRepository.save(existingTransaction);
        } catch (error) {
            console.error('Erro ao atualizar a transação:', error);
            throw new Error('Não foi possível atualizar a transação');
        }
    }
}
