import { IncomeFormComponent } from './income-form.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import spyOn = jest.spyOn;
import { UtilityService } from '../../../services/utility/utility.service';
import { IncomeService } from '../../../services/income/income.services';

describe('IncomeFormComponent', () => {

  let spectator: Spectator<IncomeFormComponent>;
  const createComponent = createComponentFactory({
    component: IncomeFormComponent,
    imports: [ReactiveFormsModule],
    mocks: [UtilityService, IncomeService],
  });

  beforeEach(() => {
    spectator = createComponent();

    spyOn(spectator.component, 'onSubmit');
  });


  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

 it('should call submit', () => {
    spectator.component.onSubmit(new Event('submit'));

    expect(spectator.component.onSubmit).toHaveBeenCalled();
  });

  it('should show input error when parsed returns null', () => {
    const utilityService = spectator.inject(UtilityService);
    spyOn(utilityService, 'parseFormValues').mockReturnValue(null);

    spectator.component.onSubmit(new Event('submit'));
    expect(spectator.component.formInputError).toBe(true);
  });

  it('should call addIncome when parsed returns values', () => {
    const utilityService = spectator.inject(UtilityService);
    spyOn(utilityService, 'parseFormValues').mockReturnValue(['Webdev Job', 5000]);

    const incomeService = spectator.inject(IncomeService);
    const addIncomeSpy = spyOn(incomeService, 'addIncome');

    spectator.component.onSubmit(new Event('submit'));

    expect(spectator.component.formInputError).toBe(false);

    expect(addIncomeSpy).toHaveBeenCalledWith({
      name: 'Webdev Job',
      amount: 5000,
    });

    expect(spectator.component.incomeControl.value).toBe(null);
  });
});

