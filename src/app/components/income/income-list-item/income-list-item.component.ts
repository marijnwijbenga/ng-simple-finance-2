import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../../ui/common/list-item/list-item.component';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';

@Component({
  selector: 'app-income-list-item',
  standalone: true,
  imports: [
    ListItemComponent,
  ],
  templateUrl: './income-list-item.component.html',
})
export class IncomeListItemComponent {
  @Input({ required: true }) public incomeItem!: TransactionItemInterface;

}
