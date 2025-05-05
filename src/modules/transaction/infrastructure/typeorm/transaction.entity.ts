import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from '../../../wallet/infrastructure/typeorm/wallet.entity';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    walletId: string;

    @ManyToOne(() => Wallet, wallet => wallet.userId, { onDelete: 'CASCADE' })
    wallet: Wallet;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    isReverted: boolean;

    revert() {
        if (this.isReverted) {
            throw new Error('Transaction has already been reverted');
        }

        this.amount = -this.amount;
        this.description = `[REVERTED] ${this.description}`;
        this.isReverted = true;
    }
}
