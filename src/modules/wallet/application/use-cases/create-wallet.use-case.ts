import { WalletRepository } from '../../domain/wallet.repository';
import { Wallet } from '../../domain/wallet.entity';
import { CreateWalletDto } from '../../infrastructure/dtos/create-wallet.dto';

export class CreateWalletUseCase {
    constructor(private readonly walletRepo: WalletRepository) { }

    async execute(user: CreateWalletDto): Promise<Wallet> {
        return this.walletRepo.create(user.userId);
    }
}