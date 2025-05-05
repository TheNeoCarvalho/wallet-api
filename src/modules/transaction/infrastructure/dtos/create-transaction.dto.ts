import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
    @IsUUID()
    @ApiProperty()
    fromWalletId: string;

    @IsUUID()
    @ApiProperty()
    toWalletId: string;

    @IsNumber()
    @Min(0.01)
    @ApiProperty()
    amount: number;
}
