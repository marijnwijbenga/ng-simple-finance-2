import { TransactionTotalComponent } from './transaction-total.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('TransactionTotalComponent', () => {
  let spectator: Spectator<TransactionTotalComponent>;
  const createComponent = createComponentFactory(TransactionTotalComponent);

  beforeEach(() => {
    spectator = createComponent();
  })

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
