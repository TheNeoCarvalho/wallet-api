import { Injectable } from '@nestjs/common';
import { Wallet } from '../../infrastructure/typeorm/wallet.entity';
import { WalletRepository } from '../../domain/wallet.repository';

@Injectable()
export class CreateWalletService {
    constructor(private readonly walletRepository: WalletRepository) { }

    async execute(userId: string): Promise<Wallet> {
        const wallet = new Wallet();
        wallet.userId = userId;
        return this.walletRepository.create(wallet);
    }
}
