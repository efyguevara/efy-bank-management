import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }
  async getUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    return user;
  }
  create(payload: CreateUserDto) {
    const newUser = { ...payload };
    return this.userRepo.insert(newUser);
  }
  async update(id: number, payload: UpdateUserDto) {
    return this.userRepo.update(id, payload);
  }

  async delete(id: number) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    return this.userRepo.delete(id);
  }
}
