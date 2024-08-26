import { Component, effect, EventEmitter, input, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { TransactionType } from '../../../types/transaction.type';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
  ],
})
export class TransactionFormComponent {

  constructor() {
      this.setupFormResetTrigger();
  }

  @Input() public placeholder = '';
  resetForm = input<boolean>(false);

  @Input() public formInputError = false;
  @Input() public errorText = 'Something went wrong';
  @Input() public transactionType!: TransactionType;
  @Output() public formValue = new EventEmitter<string>();

  formControl: FormControl = new FormControl<string>('', Validators.required);

  onSubmit() {
    this.formValue.emit(this.formControl.value as string);
  }

  setupFormResetTrigger() {
    effect(() => {
      if(this.resetForm()) {
        this.formControl.reset();
      }
    })
  }

}
