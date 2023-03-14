import { Account } from 'src/account/entities/account.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true, default: null })
  originAccountId: number;

  @Column({ nullable: true, default: null })
  destinationAccountId: number;

  @ManyToOne(() => Account, (account) => account.id)
  originAccount: Account;

  @ManyToOne(() => Account, (account) => account.id)
  destinationAccount: Account;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
