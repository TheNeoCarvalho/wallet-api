import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserController } from './infrastructure/user.controller';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        WalletModule
    ],
    controllers: [UserController],
    providers: [UserRepositoryImpl],
    exports: [UserRepositoryImpl],
})
export class UserModule { }