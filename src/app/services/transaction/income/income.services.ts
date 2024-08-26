import { Injectable, signal, WritableSignal } from '@angular/core';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { UtilityService } from '../../utility/utility.service';
import { TransactionService } from '../transaction.service';


@Injectable({
  providedIn: 'root',
})
export class IncomeService extends TransactionService {

  constructor(
    localStorageService: LocalStorageService,
    utilityService: UtilityService,
  ) {
    super(localStorageService, utilityService);

    this.loadTransactionsFromLocalStorage('SFIncomeList', this.#incomeList);
    this.setupLocalStorageWriteTrigger('SFIncomeList', this.#incomeList);
  }

  #incomeList: WritableSignal<TransactionItemInterface[]> = signal<TransactionItemInterface[]>([]);
  public readonly incomeList = this.#incomeList.asReadonly();
  public incomeTotal = this.calculateTotal(this.#incomeList);

  addTransaction(income: TransactionItemInterface): void {
    if(!income.recurringInterval) {
      income.recurringInterval = 'monthly';
    }
    const newIncomeList = [...this.#incomeList(), income];
    this.#incomeList.set(newIncomeList);
  }

  getTransaction(incomeId: number): TransactionItemInterface {
    return this.incomeList()[incomeId];
  }

  patchTransaction(id: number, income: TransactionItemInterface): void {
    this.#incomeList.update(incomeItems => {
      const newIncomeList = [...incomeItems];
      newIncomeList[id] = income;
      return newIncomeList;
    })
  }

  removeTransaction(id: number): void {
    console.log(id);
  }

  // for testing purposes
  // private seedLocalStorage(incomes: TransactionItemInterface[]): void {
  //   this.localStorageService.setLocalStorage('SFIncomeList', JSON.stringify(incomes));
  // }
}
