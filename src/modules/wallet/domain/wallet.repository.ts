import { Wallet } from '../infrastructure/typeorm/wallet.entity';

export interface WalletRepository {
    create(wallet: Wallet): Promise<Wallet>;
    findByUserId(userId: string): Promise<Wallet | null>;
}
