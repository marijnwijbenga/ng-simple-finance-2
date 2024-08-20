import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  // todo get and store data to/from localStorage

  constructor(private localStorageService: LocalStorageService) {
    // for testing purposes
    // this.localStorageService.removeLocalStorage('SFIncomeList');
    //
    // this.seedLocalStorage([
    //   {
    //     name: 'Webdev job',
    //     amount: 5500,
    //   },
    //   {
    //     name: 'guitar lessons',
    //     amount: 200,
    //   },
    //   {
    //     name: 'gitaria platform',
    //     amount: 20000,
    //   }
    // ]);

    this.loadIncomeFromLocalStorage();

    this.triggerLocalStorageWrites();
  }

  #incomeList: WritableSignal<TransactionItemInterface[]> = signal<TransactionItemInterface[]>([]);

  public readonly incomeList = this.#incomeList.asReadonly();

  public getIncome(incomeIndex: number) {
    return this.incomeList()[incomeIndex];
  }

  public addIncome(income: TransactionItemInterface): void {
    const newIncomeList = [...this.#incomeList(), income];
    this.#incomeList.set(newIncomeList);
  }

  public patchIncome(id: number, income: TransactionItemInterface): void {
    console.log(income);
    this.#incomeList.update(incomeItems => {
      const newIncomeList = [...incomeItems];
      newIncomeList[id] = income;
      return newIncomeList;
    })
  }

  private loadIncomeFromLocalStorage() {
    const incomesFromLocalStorage = this.localStorageService.getLocalStorage('SFIncomeList');
    const storedIncomeList =  JSON.parse(incomesFromLocalStorage || '') as unknown as TransactionItemInterface[];
    if(storedIncomeList) {
      this.#incomeList.set(storedIncomeList)
    }
  }

  incomeTotal: Signal<number> = computed(() => {
    return this.#incomeList().reduce((accumulator, incomeItem) => accumulator + incomeItem.amount, 0);
  });

  private triggerLocalStorageWrites() {
    effect(() => {
      const incomeList = this.#incomeList();
      this.localStorageService.setLocalStorage('SFIncomeList', JSON.stringify(incomeList));
    });
  }

  // for testing purposes
  private seedLocalStorage(incomes: TransactionItemInterface[]): void {
    this.localStorageService.setLocalStorage('SFIncomeList', JSON.stringify(incomes));
    console.log('populate storage reached');
  }
}
