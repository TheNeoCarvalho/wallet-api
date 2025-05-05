import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from '../application/services/transaction.service';
import { CreateTransactionDto } from '../application/dtos/create-transaction.dto';
import { RevertTransactionDto } from '../application/dtos/revert-transaction.dto';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    async create(@Body() dto: CreateTransactionDto) {
        const transaction = await this.transactionService.create(dto.walletId, dto.amount, dto.description);
        return { message: 'Transaction created', transaction };
    }

    @Post('revert')
    async revert(@Body() dto: RevertTransactionDto) {
        const transaction = await this.transactionService.revert(dto.transactionId);
        return { message: 'Transaction reverted', transaction };
    }
}
