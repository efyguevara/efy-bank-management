import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepo
      .createQueryBuilder('user')
      .orderBy({ 'user.id': 'ASC' })
      .leftJoinAndSelect('user.accounts', 'accounts')
      .where('(accounts.deleted = false OR accounts.id is null)')
      .andWhere('user.deleted = false')
      .getMany();
  }
  async getUser(id: number) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accounts', 'accounts')
      .where('user.id = :id', { id: id })
      .andWhere('(accounts.deleted = false OR accounts.id is null)')
      .getOne();
    if (!user) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }
    return user;
  }
  async getUserByIdentification(rut: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.accounts', 'accounts')
      .where('user.rut = :rut', { rut: rut })
      .andWhere('accounts.deleted = false')
      .getOne();
    if (!user) {
      throw new NotFoundException(
        `No se ha encontrado el usuario con Rut: ${rut}.`,
      );
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
    user.deleted = true;
    return this.userRepo.save(user);
  }
}
