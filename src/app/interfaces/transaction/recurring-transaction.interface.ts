export interface RecurringTransactionInterface {
  interval: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'yearly' | 'biyearly';
  startDate: string;
  endDate: string;
}
