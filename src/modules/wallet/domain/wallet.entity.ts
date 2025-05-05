import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @CreateDateColumn()
    createdAt: Date;
}
