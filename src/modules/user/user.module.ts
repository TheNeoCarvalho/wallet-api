import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserController } from './infrastructure/user.controller';
import { UserRepositoryImpl } from './infrastructure/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserRepositoryImpl],
    exports: [],
})
export class UserModule { }
