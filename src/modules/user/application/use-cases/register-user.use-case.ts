import { CreateUserUseCase } from './create-user.use-case';
import { CreateWalletUseCase } from '../../../wallet/application/use-cases/create-wallet.use-case';
import { UserRepository } from '../../domain/user.repository';
import { WalletRepository } from 'src/modules/wallet/domain/wallet.repository';

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

    async execute(data: { name: string; email: string; password: string }) {
        const user = await this.createUser.execute(data);
        await this.createWallet.execute(user.id);
        return user;
    }
}
