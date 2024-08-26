import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../../components/ui/common/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../../services/transaction/expense/expense.service';

@Component({
  selector: 'app-expense-modal',
  standalone: true,
  templateUrl: './expense-modal.component.html',
  imports: [
    ModalComponent,
    ReactiveFormsModule,
  ],
})
export class ExpenseModalComponent implements OnInit {
  @Output() public closeModal = new EventEmitter<boolean>();
  @Input({ required: true }) public expenseIndex!: number;

  expenseService = inject(ExpenseService);

  ngOnInit(): void {
    this.populateForm();
  }

  onCloseModal(): void {
    this.closeModal.emit(true);
  }

  expenseForm: FormGroup = new FormGroup({
    expenseName: new FormControl('', Validators.required),
    expenseAmount: new FormControl(0, Validators.required),
    expenseInterval: new FormControl(''),
  });

  onSubmit(): void {
    this.expenseService.patchTransaction(this.expenseIndex, {
      name: this.expenseForm.get('expenseName')?.value,
      amount: this.expenseForm.get('expenseAmount')?.value,
      recurringInterval: this.expenseForm.get('expenseInterval')?.value,
    });

    this.onCloseModal();
  }

  populateForm(): void {
    const expense = this.expenseService.getTransaction(this.expenseIndex);

    if (expense.name) {
      this.expenseForm.patchValue({
        expenseName: expense.name,
      });
    }
    if(expense.amount) {
      this.expenseForm.patchValue({
        expenseAmount: expense.amount
      });
    }
    if(expense.recurringInterval) {
      this.expenseForm.patchValue({
        expenseInterval: expense.recurringInterval,
      })
    }
  }
}
