import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public parseFormValues(formValue: string): [string, number] | null {
    const splitAtIndex: number = formValue.indexOf(';');

    if(splitAtIndex === -1) {
      return null;
    }

    const stringPart = formValue.substring(0, splitAtIndex);
    const numberPart = parseInt(formValue.substring(splitAtIndex + 1));

    if (isNaN(numberPart)) {
      return null;
    }

    return [stringPart, numberPart];
  }

}
