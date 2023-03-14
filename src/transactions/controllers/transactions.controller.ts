import { CreateTransactionDto } from './../dtos/transactions.dto';
import { TransactionsService } from './../services/transactions.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Get(':accountId')
  getAccounts(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.transactionsService.getTransactionsByAccountId(accountId);
  }

  @Post()
  async createTransaction(@Body() payload: CreateTransactionDto) {
    return this.transactionsService.createTransaction(payload);
  }
}
