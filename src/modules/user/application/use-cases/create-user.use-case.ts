import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import * as bcrypt from 'bcrypt';

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(data: CreateUserDTO): Promise<User> {
        const existingUser = await this.userRepo.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.password = hashedPassword;

        return this.userRepo.create(user);
    }
}
