import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/typeorm/user.entity';
import { CreateUserService } from './application/services/create-user.service';
import { TypeOrmUserRepository } from './infrastructure/typeorm/user.repository';
import { UserController } from './infrastructure/user.controller';

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        CreateUserService,
        {
            provide: 'UserRepository',
            useClass: TypeOrmUserRepository,
        },
    ],
    exports: [CreateUserService],
})
export class UserModule { }
