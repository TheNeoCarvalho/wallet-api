import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { RegisterDto } from '../application/dtos/register.dto';
import { LoginDto } from '../application/dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto.name, dto.email, dto.password);
        return { message: 'User registered successfully', user };
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.login(dto.email, dto.password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return { message: 'Login successful', user };
    }
}
