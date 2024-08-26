import { Injectable, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { UtilityService } from '../../utility/utility.service';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';
import { TransactionService } from '../transaction.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends TransactionService {

  // TODO rewrite the income components to be income components with a type(income or expense)

  #expenseList: WritableSignal<TransactionItemInterface[]> = signal<TransactionItemInterface[]>([]);
  public readonly expenseList = this.#expenseList.asReadonly();

  public expenseTotal = this.calculateTotal(this.#expenseList);

  constructor(
    localStorageService: LocalStorageService,
    utilityService: UtilityService,
  ) {
    super(localStorageService, utilityService);

    this.loadTransactionsFromLocalStorage('SFExpenseList', this.#expenseList);
    this.setupLocalStorageWriteTrigger('SFExpenseList', this.#expenseList);
  }

  addTransaction(expense: TransactionItemInterface): void {
    if(!expense.recurringInterval) {
      expense.recurringInterval = 'monthly'
    }

    const newExpenseList = [...this.#expenseList(), expense];
    this.#expenseList.set(newExpenseList);
  }

  getTransaction(expenseId: number): TransactionItemInterface {
    return this.expenseList()[expenseId];
  }

  patchTransaction(expenseId: number, expense: TransactionItemInterface): void {
    this.#expenseList.update(expenseItems => {
      const newExpenseList = [...expenseItems];
      newExpenseList[expenseId] = expense
      return newExpenseList
    })
  }

  removeTransaction(id: number): void {
    console.log(id);
  }


}
