import { CreateUserUseCase } from './create-user.use-case';
import { CreateWalletUseCase } from '../../../wallet/application/use-cases/create-wallet.use-case';
import { UserRepository } from '../../domain/user.repository';
import { WalletRepository } from '../../../wallet/domain/wallet.repository';
import { RegisterUserDto } from '../../../user/infrastructure/dtos/register-user.dto';

export class RegisterUserUseCase {
    private readonly createUser: CreateUserUseCase;
    private readonly createWallet: CreateWalletUseCase;

    constructor(
        userRepo: UserRepository,
        walletRepo: WalletRepository,
    ) {
        this.createUser = new CreateUserUseCase(userRepo);
        this.createWallet = new CreateWalletUseCase(walletRepo);
    }

    async execute(data: RegisterUserDto) {
        const user = await this.createUser.execute(data);
        if (!user) {
            throw new Error('Falha ao registrar o usuário');
        }
        const walletData = { userId: user.id };
        await this.createWallet.execute(walletData);
        return user;
    }
}
