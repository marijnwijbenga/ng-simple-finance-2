import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';
import { NgForOf } from '@angular/common';
import { ListComponent } from '../../ui/common/list/list.component';
import { TransactionType } from '../../../types/transaction.type';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  imports: [
    TransactionListItemComponent,
    NgForOf,
    ListComponent,
  ],
})
export class TransactionListComponent {

  @Output() public clickItem = new EventEmitter<number>();

  public transactionItems = input<TransactionItemInterface[]>();
  @Input({ required: true }) public transactionType!: TransactionType;

  onItemClicked(i: number) {
    this.clickItem.emit(i);
  }
}
