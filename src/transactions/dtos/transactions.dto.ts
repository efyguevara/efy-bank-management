import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsNumber()
  readonly originAccountId?: number;

  @IsOptional()
  @IsNumber()
  readonly destinationAccountId?: number;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
