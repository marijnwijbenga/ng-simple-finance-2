export interface TransactionItemInterface {
  name: string;
  amount: number;
  recurringInterval?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'yearly' | 'biyearly';
}
