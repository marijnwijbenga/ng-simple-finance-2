import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ListItemComponent } from '../../components/ui/common/list-item/list-item.component';
import { ListComponent } from '../../components/ui/common/list/list.component';
import { IncomeService } from '../../services/transaction/income/income.services';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeModalComponent } from '../../modals/income/income-modal/income-modal.component';
import { NgIf } from '@angular/common';
import { TransactionFormComponent } from '../../components/transaction/transaction-form/transaction-form.component';
import { ExpenseService } from '../../services/transaction/expense/expense.service';
import { UtilityService } from '../../services/utility/utility.service';
import { TransactionListComponent } from '../../components/transaction/transaction-list/transaction-list.component';
import { ExpenseModalComponent } from '../../modals/expense/expense-modal/expense-modal.component';
import { TransactionTotalComponent } from '../../components/transaction/transaction-total/transaction-total.component';

@Component({
  standalone: true,
  imports: [
    ListComponent,
    ListItemComponent,
    ReactiveFormsModule,
    IncomeModalComponent,
    NgIf,
    TransactionFormComponent,
    TransactionListComponent,
    ExpenseModalComponent,
    TransactionTotalComponent,
  ],
  templateUrl: './dashboard-page.component.html',
})

export class DashboardPageComponent {
  public incomeService = inject(IncomeService);
  public expenseService = inject(ExpenseService);
  public utilityService = inject(UtilityService);

  expenseFormError = false;
  resetExpenseForm: WritableSignal<boolean> = signal(false);

  incomeFormError = false;
  resetIncomeForm: WritableSignal<boolean> = signal(false);

  showIncomeModal: WritableSignal<boolean> = signal(false);
  selectedIncomeIndex: WritableSignal<number | null> = signal(null);



  onShowIncomeModal($event: number) {
    this.selectedIncomeIndex.set($event)
    this.showIncomeModal.set(true);
  }

  onCloseIncomeModal() {
    this.showIncomeModal.set(false);
    this.selectedIncomeIndex.set(null)
  }

  showExpenseModal: WritableSignal<boolean> = signal(false);
  selectedExpenseIndex: WritableSignal<number | null> = signal(null);

  onShowExpenseModal($event: number) {
    this.selectedExpenseIndex.set($event)
    this.showExpenseModal.set(true);
  }

  onCloseExpenseModal() {
    this.showExpenseModal.set(false);
    this.selectedExpenseIndex.set(null)
  }

  onSubmitIncome($event: string) {
    const parsed = this.utilityService.parseFormValues($event);

    if(!parsed) {
      this.incomeFormError = true;
      return;
    }

    this.incomeFormError = false;

    const [name, amount] = parsed;

    this.incomeService.addTransaction({
      name: name,
      amount: amount,
    });

    console.log(this.incomeService.incomeList());

    this.resetIncomeForm.set(true);
  }

  onSubmitExpense($event: string) {
    const parsed = this.utilityService.parseFormValues($event);

    if(!parsed) {
      this.expenseFormError = true;
      return;
    }

    this.expenseFormError = false;

    const [name, amount] = parsed;

    this.expenseService.addTransaction({
      name: name,
      amount: amount,
    });

    console.log(this.expenseService.expenseList());

    this.resetExpenseForm.set(true);
  }

}
