import { IncomeListComponent } from './income-list.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { TransactionItemInterface } from '../../../interfaces/transaction/transaction-item.interface';
import { IncomeListItemComponent } from '../income-list-item/income-list-item.component';
import { ListComponent } from '../../ui/common/list/list.component';
import { ListItemComponent } from '../../ui/common/list-item/list-item.component';
import spyOn = jest.spyOn;

describe('IncomeListComponent', () => {

  let spectator: Spectator<IncomeListComponent>;
  const createComponent = createComponentFactory({
    component: IncomeListComponent,
    imports: [IncomeListItemComponent, ListComponent, ListItemComponent],
  });

  beforeEach(() => {
    // generate the list
    const mockIncomes: TransactionItemInterface[] = [
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
        amount: 100,
        recurringInterval: 'daily',
      }];

    spectator = createComponent({
      props: {
        incomeItems: mockIncomes
      }
    });
  });


  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call itemClicked and emit an event', () => {
    const itemClickedSpy = spyOn(spectator.component, 'onItemClicked');
    const emitSpy = spyOn(spectator.component.clickItem, 'emit');

    const listItems = spectator.queryAll('app-income-list-item');
    spectator.click(listItems[0]);

    expect(itemClickedSpy).toHaveBeenCalledWith(0);
    expect(emitSpy).toHaveBeenCalledWith(0);
  });


});
