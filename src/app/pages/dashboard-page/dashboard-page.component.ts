import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ListItemComponent } from '../../components/ui/common/list-item/list-item.component';
import { ListComponent } from '../../components/ui/common/list/list.component';
import { IncomeListComponent } from '../../components/income/income-list/income-list.component';
import { IncomeService } from '../../services/income/income.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomeFormComponent } from '../../components/income/income-form/income-form.component';
import { IncomeTotalComponent } from '../../components/income/income-total/income-total.component';
import { IncomeModalComponent } from '../../components/income/income-modal/income-modal.component';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ListComponent,
    ListItemComponent,
    IncomeListComponent,
    ReactiveFormsModule,
    FormsModule,
    IncomeFormComponent,
    IncomeTotalComponent,
    IncomeModalComponent,
    NgIf,
  ],
  templateUrl: './dashboard-page.component.html',
})

export class DashboardPageComponent {
  public incomeService = inject(IncomeService);
  showIncomeModal: WritableSignal<boolean> = signal(false);
  selectedIncomeIndex: WritableSignal<number | null> = signal(null);

  onShowIncomeModal($event: number) {
    this.selectedIncomeIndex.set($event)
    this.showIncomeModal.set(true);
  }

  onCloseModal() {
    this.showIncomeModal.set(false);
    this.selectedIncomeIndex.set(null)
  }
}
