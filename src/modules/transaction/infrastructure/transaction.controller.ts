import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { RevertTransactionDto } from './dtos/revert-transaction.dto';
import { CreateTransactionUseCase } from '../application/use-cases/create-transaction.use-case';
import { RevertTransactionUseCase } from '../application/use-cases/revert-transaction.use-case';

@Controller('transactions')
export class TransactionController {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCase,
        private readonly revertTransactionUseCase: RevertTransactionUseCase,
    ) { }

    @Post()
    async create(@Body() dto: CreateTransactionDto) {
        await this.createTransactionUseCase.execute(dto.fromWalletId, dto.toWalletId, dto.amount);
        return { message: 'Transaction completed' };
    }

    @Post('revert')
    async revert(@Body() dto: RevertTransactionDto) {
        if (!dto?.transactionId) {
            throw new Error('Transaction ID is required');
        }
        await this.revertTransactionUseCase.execute(dto);
        return { message: 'Transaction reverted' };
    }
}
