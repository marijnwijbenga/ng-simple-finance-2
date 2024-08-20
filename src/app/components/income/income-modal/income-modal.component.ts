import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../ui/common/modal/modal.component';
import { IncomeService } from '../../../services/income/income.services';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-modal',
  standalone: true,
  imports: [
    ModalComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './income-modal.component.html',
})
export class IncomeModalComponent implements OnInit {
  @Output() public closeModal = new EventEmitter<boolean>();
  @Input({required: true}) public incomeIndex!: number;

  incomeService = inject(IncomeService);

  ngOnInit(): void {
    const income = this.incomeService.getIncome(this.incomeIndex);
    if (income) {
      this.incomeForm.patchValue({
        incomeName: income.name,
        incomeAmount: income.amount,
        incomeRecurringSchema: {
          interval: income.recurringSchema?.interval,
          startDate: income.recurringSchema?.startDate,
          endDate: income.recurringSchema?.endDate,
        }
      });
    }
  }

  onCloseModal(): void {
    this.closeModal.emit(true);
  }

  incomeForm: FormGroup = new FormGroup({
    incomeName: new FormControl('', Validators.required),
    incomeAmount: new FormControl(0, Validators.required),
    incomeRecurringSchema: new FormGroup({
      interval: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    })
  });

  onSubmit():void {
    this.incomeService.patchIncome(this.incomeIndex, {
      name: this.incomeForm.get('incomeName')?.value,
      amount: this.incomeForm.get('incomeAmount')?.value,
      recurringSchema: {
        interval: this.incomeForm.get('incomeRecurringSchema.interval')?.value,
        startDate: this.incomeForm.get('incomeRecurringSchema.startDate')?.value,
        endDate: this.incomeForm.get('incomeRecurringSchema.endDate')?.value,
      }
    });

    console.log(this.incomeForm.value);

    this.onCloseModal();
  }
}
