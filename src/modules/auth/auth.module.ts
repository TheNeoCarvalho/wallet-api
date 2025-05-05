import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './infrastructure/auth.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    imports: [UserModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
