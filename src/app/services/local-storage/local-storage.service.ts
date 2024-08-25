import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private key = '129877Koijsnkl(*&^&*(((SkjsisjiASSS7721)';

  public getLocalStorage(key: string) {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return this.decrypt(data);
  }

  public setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  private encrypt(value: any): string {
    return CryptoJS.AES.encrypt(value, this.key).toString();
  }

  private decrypt(valueToDecrypt: any) {
    return CryptoJS.AES.decrypt(valueToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
