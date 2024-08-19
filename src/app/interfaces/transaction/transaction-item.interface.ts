import { RecurringTransactionInterface } from './recurring-transaction.interface';

export interface TransactionItemInterface {
  name: string;
  currency: 'euro' | 'dollar';
  amount: number;
  recurring?: boolean;
  recurringSchema?: RecurringTransactionInterface;
}
