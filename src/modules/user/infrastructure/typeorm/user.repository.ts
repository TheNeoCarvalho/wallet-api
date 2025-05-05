import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) { }

    async create(user: User): Promise<User> {
        const created = this.repository.create(user);
        const saved = await this.repository.save(created);
        return new User(saved.id, saved.name, saved.email, saved.password);
    }

    async findByEmail(email: string): Promise<User | null> {
        const found = await this.repository.findOneBy({ email });
        if (!found) return null;
        return new User(found.id, found.name, found.email, found.password);
    }

    async findById(id: string): Promise<User | null> {
        const found = await this.repository.findOneBy({ id });
        if (!found) return null;
        return new User(found.id, found.name, found.email, found.password);
    }
}
