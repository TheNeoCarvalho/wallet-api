import { Module } from '@nestjs/common';
import { TransactionController } from './infrastructure/transaction.controller';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { RevertTransactionUseCase } from './application/use-cases/revert-transaction.use-case';
import { TRANSACTION_REPOSITORY } from './domain/transaction.repository';
import { TransactionRepositoryImpl } from './infrastructure/transaction.repository';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [WalletModule],
    controllers: [TransactionController],
    providers: [
        CreateTransactionUseCase,
        RevertTransactionUseCase,
        {
            provide: TRANSACTION_REPOSITORY,
            useClass: TransactionRepositoryImpl,
        },
    ],
})
export class TransactionModule { }
