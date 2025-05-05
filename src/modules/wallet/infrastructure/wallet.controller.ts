import { Body, Controller, Post } from '@nestjs/common';
import { CreateWalletService } from '../application/services/create-wallet.service';

@Controller('wallets')
export class WalletController {
    constructor(private readonly createWalletService: CreateWalletService) { }

    @Post()
    async create(@Body() body: { userId: string }) {
        const { userId } = body;
        const wallet = await this.createWalletService.execute(userId);
        return {
            id: wallet.id,
            userId: wallet.userId,
            balance: wallet.balance,
        };
    }
}
