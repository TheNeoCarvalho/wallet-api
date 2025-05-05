import { WalletRepository } from '../../domain/wallet.repository';
import { Wallet } from '../../domain/wallet.entity';

export class CreateWalletUseCase {
    constructor(private readonly walletRepo: WalletRepository) { }

    async execute(userId: string): Promise<Wallet> {
        return this.walletRepo.create(userId);
    }
}
