import { TransactionListComponent } from './transaction-list.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import spyOn = jest.spyOn;

describe('TransactionListComponent', () => {
  let spectator: Spectator<TransactionListComponent>;
  const createComponent = createComponentFactory({
    component: TransactionListComponent,
    imports: [TransactionListComponent]
    }
  );

  beforeEach(() => {
    spectator = createComponent({
      props: {
        transactionItems: [
          {
            name: 'test name',
            amount: 200,
            recurringInterval: 'monthly',
          },
          {
            name: 'test name 2',
            amount: 300,
            recurringInterval: 'weekly',
          },
          {
            name: 'test name 3',
            amount: 300,
            recurringInterval: 'daily',
          }
        ],
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should list the items', () => {
    const transactions = spectator.queryAll('app-transaction-list-item');
    expect(transactions.length).toBe(3);
  });

  it('should emit the item index number on item click', () => {
    const emitSpy = spyOn(spectator.component.clickItem, 'emit');
    const transactions = spectator.queryAll('app-transaction-list-item');

    spectator.click(transactions[0]);

    expect(emitSpy).toHaveBeenCalledWith(0);
  });
});
