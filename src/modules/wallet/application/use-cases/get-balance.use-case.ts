import { WalletRepository } from '../../domain/wallet.repository';

export class GetBalanceUseCase {
    constructor(private readonly walletRepo: WalletRepository) { }

    async execute(userId: string): Promise<{ balance: number }> {
        const wallet = await this.walletRepo.findByUserId(userId);
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return { balance: +wallet.balance };
    }
}
