import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user.entity';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    async register(name: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(uuidv4(), name, email, hashedPassword);
        return this.userRepository.create(user);
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    }
}
