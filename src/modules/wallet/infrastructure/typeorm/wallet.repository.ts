import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../../domain/wallet.repository';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmWalletRepository implements WalletRepository {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>
    ) { }

    async create(wallet: Wallet): Promise<Wallet> {
        return this.walletRepository.save(wallet);
    }

    async findByUserId(userId: string): Promise<Wallet | null> {
        return this.walletRepository.findOne({ where: { userId } });
    }
}
