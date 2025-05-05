import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {
        super();
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({ email });
    }

    findById(id: string): Promise<User | null> {
        return this.repo.findOneBy({ id });
    }

    create(user: User): Promise<User> {
        return this.repo.save(user);
    }
}
