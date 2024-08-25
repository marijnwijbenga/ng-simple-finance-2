import { Injectable } from '@angular/core';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public parseFormValues(formValue: string): [string, number] | null {
    const splitAtIndex: number = formValue.indexOf(';');

    if(splitAtIndex === -1) {
      return null;
    }

    const stringPart = formValue.substring(0, splitAtIndex);
    const numberPart = parseInt(formValue.substring(splitAtIndex + 1));

    if (isNaN(numberPart)) {
      return null;
    }

    return [stringPart, numberPart];
  }


  calculateMonthlyAmount(transaction: TransactionItemInterface): number {
    switch (transaction.recurringInterval) {
      case 'daily':
        return transaction.amount * 30.5;
      case 'biweekly':
        return transaction.amount * 8.66;
      case 'weekly':
        return transaction.amount * 4.33;
      case 'bimonthly':
        return transaction.amount * 2;
      case 'biyearly':
        return transaction.amount * (2 / 12);
      case 'yearly':
        return transaction.amount * (1 / 12);
      default:
        return transaction.amount; // Assuming no recurrence means monthly
    }
  }
}
