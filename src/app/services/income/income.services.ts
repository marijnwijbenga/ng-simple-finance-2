import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UtilityService } from '../utility/utility.service';


@Injectable({
  providedIn: 'root',
})
export class IncomeService {

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

    this.loadIncomeFromLocalStorage('SFIncomeList');

    this.setupLocalStorageWriteTrigger('SFIncomeList');
  }

  serviceInitialized = false;

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

  private loadIncomeFromLocalStorage(localStorageKey: string): void {
    const incomesFromLocalStorage = this.localStorageService.getLocalStorage(localStorageKey);
    if(incomesFromLocalStorage) {
      const storedIncomeList =  JSON.parse(incomesFromLocalStorage) as unknown as TransactionItemInterface[];

      if(storedIncomeList) {
        this.#incomeList.set(storedIncomeList)
      }
    }
  }

  incomeTotal: Signal<number> = computed(() => {
    const startAtNumber = 0;
    return this.#incomeList().reduce(
      (accumulator, incomeItem) => {
        return accumulator + this.utilityService.calculateMonthlyAmount(incomeItem)
      }, startAtNumber
     )
  });

  private setupLocalStorageWriteTrigger(localStorageKey: string) {
    effect(() => {
      const incomeList = this.#incomeList();
      if(this.serviceInitialized) {
        this.localStorageService.setLocalStorage(localStorageKey, JSON.stringify(incomeList));
      }
      this.serviceInitialized = true;
    });
  }

  // for testing purposes
  // private seedLocalStorage(incomes: TransactionItemInterface[]): void {
  //   this.localStorageService.setLocalStorage('SFIncomeList', JSON.stringify(incomes));
  // }
}
