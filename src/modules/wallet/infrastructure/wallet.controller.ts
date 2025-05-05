import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { WalletRepositoryImpl } from './wallet.repository';
import { GetBalanceUseCase } from '../application/use-cases/get-balance.use-case';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'; // depois adicionamos isso

@Controller('wallet')
export class WalletController {
    private getBalanceUseCase: GetBalanceUseCase;

    constructor(private readonly walletRepo: WalletRepositoryImpl) {
        this.getBalanceUseCase = new GetBalanceUseCase(walletRepo);
    }

    @Get('balance')
    // @UseGuards(JwtAuthGuard)
    async getBalance(@Req() request: Request) {
        const userId = (request as any).user?.sub || 'mock-user-id';
        return this.getBalanceUseCase.execute(userId);
    }
}
