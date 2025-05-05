import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './domain/wallet.entity';
import { WalletRepositoryImpl } from './infrastructure/wallet.repository';
import { WalletController } from './infrastructure/wallet.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletController],
    providers: [WalletRepositoryImpl],
    exports: [WalletRepositoryImpl],
})
export class WalletModule { }
