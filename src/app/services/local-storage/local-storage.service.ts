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
      console.warn(`No data found for key: ${key}`);
      return null;
    }

    try {
      const decryptedData = this.decrypt(data);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return null;
    }

  }

  public setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, this.encrypt(JSON.stringify(value)));
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
