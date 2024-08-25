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
  @Input({ required: true }) public incomeIndex!: number;

  incomeService = inject(IncomeService);

  ngOnInit(): void {
    this.populateForm();
  }

  onCloseModal(): void {
    this.closeModal.emit(true);
  }

  incomeForm: FormGroup = new FormGroup({
    incomeName: new FormControl('', Validators.required),
    incomeAmount: new FormControl(0, Validators.required),
    incomeInterval: new FormControl(''),
  });

  onSubmit(): void {
    this.incomeService.patchIncome(this.incomeIndex, {
      name: this.incomeForm.get('incomeName')?.value,
      amount: this.incomeForm.get('incomeAmount')?.value,
      recurringInterval: this.incomeForm.get('incomeInterval')?.value,
    });

    this.onCloseModal();
  }

  populateForm(): void {
    const income = this.incomeService.getIncome(this.incomeIndex);

    if (income.name) {
      this.incomeForm.patchValue({
        incomeName: income.name,
      });
    }
    if(income.amount) {
      this.incomeForm.patchValue({
      incomeAmount: income.amount
      });
    }
    if(income.recurringInterval) {
      this.incomeForm.patchValue({
        incomeInterval: income.recurringInterval,
      })
    }
  }
}
