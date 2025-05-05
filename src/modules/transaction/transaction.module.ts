import { Module } from '@nestjs/common';
import { TransactionController } from './infrastructure/transaction.controller';
import { TransactionService } from './application/services/transaction.service';
import { TransactionRepository } from './domain/transaction.repository';
import { TypeOrmTransactionRepository } from './infrastructure/typeorm/transaction.repository';

@Module({
    controllers: [TransactionController],
    providers: [
        TransactionService,
        {
            provide: 'TransactionRepository',
            useClass: TypeOrmTransactionRepository,
        },
    ],
})
export class TransactionModule { }
