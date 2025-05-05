import { UserRepository } from '../../domain/user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from '../../infrastructure/dtos/login-user.dto';

export class AuthenticateUserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(data: LoginUserDto): Promise<{ token: string }> {
        const user = await this.userRepo.findByEmail(data.email);
        if (!user) throw new Error('Invalid credentials');

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) throw new Error('Invalid credentials');

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });

        return { token };
    }
}
