import { Transactions } from 'src/transactions/entities/transactions.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  number: number;

  @Column({ type: 'varchar', length: 255 })
  bank: string;

  @Column({ type: 'number' })
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'varchar', length: 255, default: 0 })
  balance: number;

  @OneToMany(
    () => Transactions,
    (transactions) => transactions.destinationAccount,
  )
  inboundTransactions: Transactions[];

  @OneToMany(() => Transactions, (transactions) => transactions.originAccount)
  outboundTransactions: Transactions[];
}
