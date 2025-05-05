import { Wallet } from './wallet.entity';

export abstract class WalletRepository {
    abstract create(userId: string): Promise<Wallet>;
    abstract findByUserId(userId: string): Promise<Wallet | null>;
    abstract update(wallet: Wallet): Promise<Wallet>;
}
