import { Component, inject } from '@angular/core';
import { IncomeService } from '../../../services/income/income.services';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { UtilityService } from '../../../services/utility/utility.service';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './income-form.component.html',
})
export class IncomeFormComponent {
  public incomeService = inject(IncomeService);
  private utilityService = inject(UtilityService);

  incomeControl: FormControl = new FormControl<string>('', Validators.required);

  formInputError = false;

  onSubmit(e: Event) {
    e.preventDefault();
    const incomeFormValue = this.incomeControl.value;
    const parsed = this.utilityService.parseFormValues(incomeFormValue);

    if (!parsed) {
      // show input error message
      this.formInputError = true;
      console.error('wrong input format');
      return;
    }

    this.formInputError = false;
    this.incomeService.addIncome({
      name: parsed[0],
      amount: parsed[1],
    });
    this.incomeControl.reset();
  }
}
