import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './services/transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
