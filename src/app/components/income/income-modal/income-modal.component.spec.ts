import { IncomeModalComponent } from './income-modal.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../ui/common/modal/modal.component';
import { IncomeService } from '../../../services/income/income.services';
import spyOn = jest.spyOn;

describe('IncomeModalComponent', () => {
  let spectator: Spectator<IncomeModalComponent>;
  const createComponent = createComponentFactory({
    component: IncomeModalComponent,
    imports: [ReactiveFormsModule, ModalComponent],
    providers: [
      mockProvider(IncomeService, {
        getIncome: jest.fn().mockReturnValue({
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
        incomeIndex: 3,
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

    spectator.typeInElement('Test Income', 'input[formControlName="incomeName"]');
    spectator.typeInElement('1000', 'input[formControlName="incomeAmount"]');
    spectator.selectOption('select[formControlName="incomeInterval"]', 'monthly');

    spectator.triggerEventHandler('form', 'ngSubmit', { preventDefault: () => {} });

    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
