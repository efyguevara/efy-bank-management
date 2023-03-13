import { UserService } from '../../user/services/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../dtos/account.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    private userService: UserService,
  ) {}

  async getAccounts(rut: string) {
    const user = await this.userService.getUserByIdentification(rut);
    const accounts = user.accounts.filter(
      (account) => account.deleted !== true,
    );
    if (!accounts) {
      throw new NotFoundException(`El usuario no tiene ninguna cuenta.`);
    }
    return accounts;
  }
  async create(payload: CreateAccountDto) {
    const user = await this.userService.getUserByIdentification(payload.rut);

    const newAccount: Account = this.accountRepo.create({ ...payload });
    newAccount.user = user;

    return this.accountRepo.insert(newAccount);
  }
  async delete(rut: string, id: number) {
    const accounts = await this.getAccounts(rut);
    const accountToDelete = accounts.find((account) => account.id === id);

    if (!accountToDelete) {
      throw new NotFoundException(`La cuenta id N°${id} no existe`);
    }
    accountToDelete.deleted = true;
    this.accountRepo.update(id, accountToDelete);
  }
}
