import { Component, Input } from '@angular/core';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';
import { ListItemComponent } from '../../ui/common/list-item/list-item.component';
import { NgClass } from '@angular/common';
import { TransactionType } from '../../../types/transaction.type';

@Component({
  selector: 'app-transaction-list-item',
  standalone: true,
  templateUrl: './transaction-list-item.component.html',
  imports: [
    ListItemComponent,
    NgClass,
  ],
})
export class TransactionListItemComponent {
 @Input({ required: true }) public transactionItem!: TransactionItemInterface;
 @Input({ required: true }) public transactionType!: TransactionType;
}
