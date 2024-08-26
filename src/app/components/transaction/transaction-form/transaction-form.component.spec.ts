import { TransactionFormComponent } from './transaction-form.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import spyOn = jest.spyOn;

describe('TransactionFormComponent', () => {
  let spectator: Spectator<TransactionFormComponent>;
  const createComponent = createComponentFactory(TransactionFormComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should output/emit the input', () => {
    const emitSpy = spyOn(spectator.component.formValue, 'emit');
    const submitSpy = spyOn(spectator.component, 'onSubmit');

    const input = spectator.query('#transaction-input') as HTMLInputElement;
    const submit = spectator.query('#transaction-submit') as HTMLButtonElement;

    spectator.typeInElement('transaction; 300', input);

    spectator.click(submit);

    expect(submitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith('transaction; 300');
  });

  it('should show the button in the color of the type that is received as input', () => {
    const button = spectator.query('button[type="submit"]') as HTMLButtonElement;

    spectator.component.transactionType = 'expense'

    spectator.detectChanges();

    expect(button?.classList.contains('bg-error')).toBe(true);
  });

  it('should clear the input, after submit, if a valid value is passed in ', () => {
    const resetSpy = spyOn(spectator.component.formControl, 'reset');
    const input = spectator.query('#transaction-input') as HTMLInputElement;

    spectator.typeInElement('transaction; 300', input);

    expect(input).toHaveValue('transaction; 300');

    spectator.setInput('resetForm', true);

    expect(resetSpy).toHaveBeenCalled();


    expect(input).toHaveValue('');
  });
});
