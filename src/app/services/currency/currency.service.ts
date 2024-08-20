import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CurrencyType } from '../../types/currency.type';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  localStorageService = inject(LocalStorageService);

  #currency: WritableSignal<CurrencyType> = signal('euro');

  public readonly currency = this.#currency.asReadonly();

  setCurrency(currency: CurrencyType) {
    this.#currency.set(currency);
    this.localStorageService.setLocalStorage('SFCurrency', currency);
  }

  getCurrencyFromLocalStorage() {
    const currencyFromLocalStorage = this.localStorageService.getLocalStorage('SFCurrency');
    if(currencyFromLocalStorage) {
      this.#currency.set(currencyFromLocalStorage as CurrencyType);
    }
  }
}
