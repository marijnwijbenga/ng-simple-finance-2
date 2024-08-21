import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UtilityService } from '../utility/utility.service';


@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  // todo get and store data to/from localStorage

  constructor(
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService,
  ) {
    // for testing purposes
    // this.localStorageService.removeLocalStorage('SFIncomeList');
    //
    // this.seedLocalStorage([
    //   {
    //     name: 'Webdev job',
    //     amount: 5500,
    //     recurringInterval: 'monthly'
    //   },
    //   {
    //     name: 'guitar lessons',
    //     amount: 200,
    //     recurringInterval: 'monthly'
    //   },
    //   {
    //     name: 'gitaria platform',
    //     amount: 20000,
    //     recurringInterval: 'monthly'
    //   }
    // ]);

    this.loadIncomeFromLocalStorage();

    this.triggerLocalStorageWrites();
  }

  #incomeList: WritableSignal<TransactionItemInterface[]> = signal<TransactionItemInterface[]>([]);

  public readonly incomeList = this.#incomeList.asReadonly();

  public getIncome(incomeIndex: number): TransactionItemInterface {
    return this.incomeList()[incomeIndex];
  }

  public addIncome(income: TransactionItemInterface): void {
    if(!income.recurringInterval) {
      income.recurringInterval = 'monthly';
    }
    const newIncomeList = [...this.#incomeList(), income];
    this.#incomeList.set(newIncomeList);
  }

  public patchIncome(id: number, income: TransactionItemInterface): void {
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
    return this.#incomeList().reduce(
      (accumulator, incomeItem) => {
        return accumulator + this.utilityService.calculateMonthlyAmount(incomeItem)
      }, 0
     )
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
  }
}
