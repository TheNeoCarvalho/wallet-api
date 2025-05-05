import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../domain/wallet.entity';
import { Repository } from 'typeorm';
import { WalletRepository } from '../domain/wallet.repository';

@Injectable()
export class WalletRepositoryImpl extends WalletRepository {
    constructor(
        @InjectRepository(Wallet)
        private readonly repo: Repository<Wallet>,
    ) {
        super();
    }

    create(userId: string): Promise<Wallet> {
        const wallet = this.repo.create({ userId });
        return this.repo.save(wallet);
    }

    findByUserId(userId: string): Promise<Wallet | null> {
        return this.repo.findOneBy({ userId });
    }

    update(wallet: Wallet): Promise<Wallet> {
        return this.repo.save(wallet);
    }
}
