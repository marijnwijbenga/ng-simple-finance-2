import { TransactionListItemComponent } from './transaction-list-item.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('TransactionListItemComponent', () => {
  let spectator: Spectator<TransactionListItemComponent>;
  const createComponent = createComponentFactory(TransactionListItemComponent);
  beforeEach(() => {
    spectator = createComponent({
      props: {
        transactionItem: {
          name: 'test name',
          amount: 200,
        },
        transactionType: 'expense',
      },
    });

  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the name of the transaction item', () => {
    const transactionListItem = spectator.query('#transactionName') as HTMLSpanElement;
    expect(transactionListItem.innerHTML).toBe('test name');
  });

  it('should display the amount of the transaction item', () => {
    const transactionListItem = spectator.query('#transactionAmount') as HTMLSpanElement;
    expect(transactionListItem.innerHTML).toBe(" € 200 ");
  });

  it('should be in the color indicated by the transaction type', () => {
    spectator.setInput('transactionType', 'income');

    const transactionListItem = spectator.query('app-list-item');
    expect(transactionListItem?.classList.contains('bg-green-200')).toBe(true);
  });

});
