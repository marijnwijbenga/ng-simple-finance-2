import { Injectable, signal } from '@angular/core';
import { TransactionItemInterface } from '../../interfaces/transaction/transaction-item.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  // todo get and store data to/from localStorage

  constructor(private localStorageService: LocalStorageService) {
    this.populateLocalStorage([
      {
        name: 'Webdev job',
        currency: 'euro',
        amount: 5500,
      },
      {
        name: 'guitar lessons',
        currency: 'euro',
        amount: 200,
      },
      {
        name: 'gitaria platform',
        currency: 'euro',
        amount: 20000,
      }
    ]);

    this.loadIncomeFromLocalStorage();
  }



  #incomeList = signal<TransactionItemInterface[]>([]);

  public readonly incomeList = this.#incomeList.asReadonly();

  public addIncome(income: TransactionItemInterface): void {
    const newIncomeList = [...this.#incomeList(), income];
    this.#incomeList.set(newIncomeList);

    // send off to local storage
    this.localStorageService.setLocalStorage('SFIncomeList', newIncomeList);
  }

  private loadIncomeFromLocalStorage() {
    const storedIncomeList = this.localStorageService.getLocalStorage('SFIncomeList') as unknown as TransactionItemInterface[];
    if(storedIncomeList) {
      this.#incomeList.set(storedIncomeList)
    }
  }

  private populateLocalStorage(incomes: TransactionItemInterface[]): void {
    this.localStorageService.setLocalStorage('SFIncomeList', incomes);
    console.log('populate storage reached');
  }
}
