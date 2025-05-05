import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { WalletRepositoryImpl } from './wallet.repository';
import { GetBalanceUseCase } from '../application/use-cases/get-balance.use-case';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'; // depois adicionamos isso

@Controller('wallet')
@ApiTags('Wallet')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard) // depois adicionamos isso
export class WalletController {
    private getBalanceUseCase: GetBalanceUseCase;

    constructor(private readonly walletRepo: WalletRepositoryImpl) {
        this.getBalanceUseCase = new GetBalanceUseCase(walletRepo);
    }

    @Get('balance')
    @ApiResponse({ status: 200, description: 'Retorna o saldo da carteira.' })
    @ApiResponse({ status: 401, description: 'Não autorizado.' })
    @ApiResponse({ status: 404, description: 'Carteira não encontrada.' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
    // @UseGuards(JwtAuthGuard)
    async getBalance(@Req() request: Request) {
        const userId = (request as any).user?.sub || 'mock-user-id';
        return this.getBalanceUseCase.execute(userId);
    }
}
