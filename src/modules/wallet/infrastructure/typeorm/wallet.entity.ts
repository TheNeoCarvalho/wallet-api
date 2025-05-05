import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../../user/infrastructure/typeorm/user.entity';
// import { User } from '../../user/infrastructure/typeorm/user.entity';

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', default: 0 })
    balance: number;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @Column({ type: 'uuid' })
    userId: string;
}
