import { Component, inject } from '@angular/core';
import { IncomeService } from '../../../services/income/income.services';

@Component({
  selector: 'app-income-total',
  standalone: true,
  imports: [],
  templateUrl: './income-total.component.html',
})
export class IncomeTotalComponent {
  incomeService = inject(IncomeService);
}
