import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers(): string {
    return 'Listado de usuarios';
  }
  getUser(id: string): string {
    return `Datos del usuario ${id}`;
  }
  create(): string {
    return 'Nuevo usuario';
  }
  edit(id: string): string {
    return `Editando el usuario ${id}`;
  }
  delete(id: string): string {
    return `Usuario ${id} eliminado`;
  }
}
