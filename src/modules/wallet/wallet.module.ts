import { Module } from '@nestjs/common';
import { WalletController } from './infrastructure/wallet.controller';
import { CreateWalletService } from './application/services/create-wallet.service';
import { WalletRepository } from './domain/wallet.repository';
import { TypeOrmWalletRepository } from './infrastructure/typeorm/wallet.repository';



@Module({
    controllers: [WalletController],
    providers: [
        CreateWalletService,
        {
            provide: 'WalletRepository',
            useClass: TypeOrmWalletRepository,
        },
    ],
})
export class WalletModule { }
