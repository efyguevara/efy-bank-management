import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsNumber()
  readonly number: number;

  @IsNotEmpty()
  @IsString()
  readonly bank: string;

  @IsNotEmpty()
  @IsString()
  readonly rut: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
