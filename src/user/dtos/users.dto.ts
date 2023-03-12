export class CreateUserDto {
  readonly name: string;
  readonly lastName: string;
  readonly rut: string;
}

export class UpdateUserDto {
  readonly name?: string;
  readonly lastName?: string;
}
