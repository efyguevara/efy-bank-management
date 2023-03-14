import { CreateTransactionDto } from './../dtos/transactions.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transactions } from '../entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
  ) {}

  getTransactionsByAccountId2(accountId: any) {
    return this.transactionsRepo.find(accountId);
  }

  async getTransactionsByAccountId(accountId: number): Promise<Transactions[]> {
    return this.transactionsRepo
      .createQueryBuilder('transactions')
      .where('transactions.originAccountId = :accountId', {
        accountId: accountId,
      })
      .orWhere('transactions.destinationAccountId = :accountId', {
        accountId: accountId,
      })
      .getMany();
  }

  async createTransaction(payload: CreateTransactionDto) {
    const newTransaction = { ...payload };

    return this.transactionsRepo.insert(newTransaction);
  }
}
