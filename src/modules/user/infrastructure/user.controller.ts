import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../application/use-cases/authenticate-user.use-case';
import { UserRepositoryImpl } from './user.repository';
import { WalletRepositoryImpl } from '../../wallet/infrastructure/wallet.repository';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class UserController {
    private readonly registerUser: RegisterUserUseCase;
    private readonly authUser: AuthenticateUserUseCase;

    constructor(
        private readonly userRepo: UserRepositoryImpl,
        private readonly walletRepo: WalletRepositoryImpl,
    ) {
        this.registerUser = new RegisterUserUseCase(userRepo, walletRepo);
        this.authUser = new AuthenticateUserUseCase(userRepo);
    }
    @Post('login')
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso!!.' })
    @ApiResponse({ status: 401, description: 'Usuário ou senha inválidos.' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
    async login(@Body() body: LoginUserDto) {
        const token = await this.authUser.execute(body);
        if (!token) {
            throw new Error('Usuário ou senha inválidos');
        }
        return { token };
    }
    @Post('register')
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso!!.' })
    @ApiResponse({ status: 400, description: 'Erro ao registrar o usuário.' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
    @ApiResponse({ status: 409, description: 'Usuário já existe.' })
    @ApiResponse({ status: 422, description: 'Erro de validação.' })
    async register(@Body() body: RegisterUserDto) {
        const user = await this.registerUser.execute(body);
        return { user };
    }
}
