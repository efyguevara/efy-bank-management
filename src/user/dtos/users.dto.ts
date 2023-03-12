import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly rut: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
