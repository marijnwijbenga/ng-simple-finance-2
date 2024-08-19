import { Component, input } from '@angular/core';
import { IncomeListItemComponent } from '../income-list-item/income-list-item.component';
import { ListComponent } from '../../ui/common/list/list.component';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-income-list',
  standalone: true,
  imports: [
    IncomeListItemComponent,
    ListComponent,
    NgForOf,
  ],
  templateUrl: './income-list.component.html',
})
export class IncomeListComponent {
  incomeItems = input<TransactionItemInterface[]>();

}
