import { Component, Input, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TransactionType } from '../../../types/transaction.type';

@Component({
  selector: 'app-transaction-total',
  standalone: true,
  templateUrl: './transaction-total.component.html',
  imports: [
    NgClass,
  ],
})
export class TransactionTotalComponent {
 public transactionTotal = input<number>();
 @Input({ required: true }) public transactionType!: TransactionType;
}
