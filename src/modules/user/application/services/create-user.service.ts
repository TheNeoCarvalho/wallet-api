import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateUserService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }

    async execute(name: string, email: string, password: string): Promise<User> {
        const user = new User(randomUUID(), name, email, password);
        return await this.userRepository.create(user);
    }
}
