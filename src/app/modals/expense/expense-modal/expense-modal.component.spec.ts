import { ExpenseModalComponent } from './expense-modal.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../components/ui/common/modal/modal.component';
import { ExpenseService } from '../../../services/transaction/expense/expense.service';
import spyOn = jest.spyOn;

describe('ExpenseModalComponent', () => {
  let spectator: Spectator<ExpenseModalComponent>;
  const createComponent = createComponentFactory({
    component: ExpenseModalComponent,
    imports: [ReactiveFormsModule, ModalComponent],
    providers: [
      mockProvider(ExpenseService, {
        getTransaction: jest.fn().mockReturnValue({
          name: 'test name',
          amount: 200,
          recurringInterval: 'monthly',
        })
      }),
    ]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        expenseIndex: 3,
      }
    });
  })

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should close the modal and emit', () => {
    const closeModalSpy = spyOn(spectator.component, 'onCloseModal');
    const emitSpy = spyOn(spectator.component.closeModal, 'emit');

    const closeModalButton = spectator.query('button[type="reset"]');

    spectator.click(closeModalButton as HTMLButtonElement);

    expect(closeModalSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should call submit', () => {
    const onSubmitSpy = spyOn(spectator.component, 'onSubmit');

    const submitButton = spectator.query('button[type="submit"]') as HTMLButtonElement;

    spectator.click(submitButton);

    expect(onSubmitSpy).toHaveBeenCalled();
  });

});
