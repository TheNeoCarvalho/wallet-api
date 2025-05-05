import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { AuthenticateUserUseCase } from '../application/use-cases/authenticate-user.use-case';
import { UserRepositoryImpl } from './user.repository';

@Controller('users')
export class UserController {
    private createUser: CreateUserUseCase;
    private authUser: AuthenticateUserUseCase;

    constructor(private readonly userRepo: UserRepositoryImpl) {
        this.createUser = new CreateUserUseCase(userRepo);
        this.authUser = new AuthenticateUserUseCase(userRepo);
    }

    @Post('register')
    async register(@Body() body: any) {
        const user = await this.createUser.execute(body);
        return { id: user.id, email: user.email, name: user.name };
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authUser.execute(body);
    }
}
