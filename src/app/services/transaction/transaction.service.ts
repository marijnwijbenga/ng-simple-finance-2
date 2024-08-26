import { computed, effect, Injectable, Signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UtilityService } from '../utility/utility.service';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class TransactionService {

  protected constructor(
    protected localStorageService: LocalStorageService,
    protected utilityService: UtilityService,
  ) { }

  protected serviceInitialized = false;

  abstract getTransaction(id: number): TransactionItemInterface;
  abstract addTransaction(transaction: TransactionItemInterface): void;
  abstract removeTransaction(id: number): void;
  abstract patchTransaction(id: number, transaction: TransactionItemInterface): void;

  protected setupLocalStorageWriteTrigger(key: string, list: WritableSignal<TransactionItemInterface[]>) {
    effect(() => {
      const transactionList = list();
      if(this.serviceInitialized) {
        this.localStorageService.setLocalStorage(key, JSON.stringify(transactionList));
      }
      this.serviceInitialized = true;
    });
  }

  protected loadTransactionsFromLocalStorage(key: string, list: WritableSignal<TransactionItemInterface[]>): void {
    const transactionFromLocalStorage = this.localStorageService.getLocalStorage(key);

    if(transactionFromLocalStorage) {
      const storedTransactionList =  JSON.parse(transactionFromLocalStorage) as TransactionItemInterface[];

      if(storedTransactionList) {
        list.set(storedTransactionList);
      }
    }
  }


  protected calculateTotal(list: WritableSignal<TransactionItemInterface[]>): Signal<number> {
    return computed(() => {
      const startAtNumber = 0;
      return list().reduce(
        (accumulator, incomeItem) => {
          return accumulator + this.utilityService.calculateMonthlyAmount(incomeItem)
        }, startAtNumber
      )
    })

  }
}
