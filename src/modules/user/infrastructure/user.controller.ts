import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../application/services/create-user.service';

@Controller('users')
export class UserController {
    constructor(private readonly createUserService: CreateUserService) { }

    @Post()
    async create(@Body() body: { name: string; email: string; password: string }) {
        const { name, email, password } = body;
        const user = await this.createUserService.execute(name, email, password);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
