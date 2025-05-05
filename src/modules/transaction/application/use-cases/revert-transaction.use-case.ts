import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionRepository } from '../../domain/transaction.repository';
import { RevertTransactionDto } from '../../infrastructure/dtos/revert-transaction.dto';

@Injectable()
export class RevertTransactionUseCase {
    constructor(private readonly repository: TransactionRepository) { }

    async execute(data: RevertTransactionDto): Promise<void> {
        const transaction = await this.repository.findById(data.transactionId);
        if (!transaction) throw new NotFoundException('Transaction not found');
        if (transaction.reverted) throw new BadRequestException('Transaction already reverted');

        await this.repository.revert(data.transactionId);
    }
}
