import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RevertTransactionDto {
    @IsUUID()
    @ApiProperty()
    transactionId: string;
}
