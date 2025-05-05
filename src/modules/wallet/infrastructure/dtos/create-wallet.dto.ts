import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWalletDto {
    @IsUUID()
    @ApiProperty()
    userId: string;
}
