import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { AuthenticateUserUseCase } from '../application/use-cases/authenticate-user.use-case';
import { UserRepositoryImpl } from './user.repository';
import { WalletRepositoryImpl } from '../../wallet/infrastructure/wallet.repository';
import { CreateWalletUseCase } from '../../wallet/application/use-cases/create-wallet.use-case';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';

@Controller('user')
export class UserController {
    private readonly registerUser: RegisterUserUseCase;
    private readonly authUser: AuthenticateUserUseCase;

    constructor(
        private readonly userRepo: UserRepositoryImpl,
        private readonly walletRepo: WalletRepositoryImpl,
    ) {
        this.registerUser = new RegisterUserUseCase(userRepo, walletRepo);
        this.authUser = new AuthenticateUserUseCase(userRepo);
    }

    @Post('register')
    async register(@Body() body: any) {
        const user = await this.registerUser.execute(body);
        return { id: user.id, email: user.email, name: user.name };
    }
}
