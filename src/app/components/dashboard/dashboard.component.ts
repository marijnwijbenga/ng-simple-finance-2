import { Component, inject } from '@angular/core';
import { ListComponent } from '../ui/common/list/list.component';
import { ListItemComponent } from '../ui/common/list-item/list-item.component';
import { IncomeService } from '../../services/income/income.services';
import { IncomeListComponent } from '../income/income-list/income-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent,
    ListItemComponent,
    IncomeListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  public incomeService = inject(IncomeService);

}
