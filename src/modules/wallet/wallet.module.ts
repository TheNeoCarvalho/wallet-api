import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './domain/wallet.entity';
import { WalletRepositoryImpl } from './infrastructure/wallet.repository';
import { WalletController } from './infrastructure/wallet.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletRepositoryImpl],
    exports: [WalletRepositoryImpl],
    controllers: [WalletController],
})
export class WalletModule { }
