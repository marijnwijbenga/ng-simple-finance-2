import { RecurringTransactionInterface } from './recurring-transaction.interface';

export interface TransactionItemInterface {
  name: string;
  amount: number;
  recurringSchema?: RecurringTransactionInterface;
}
