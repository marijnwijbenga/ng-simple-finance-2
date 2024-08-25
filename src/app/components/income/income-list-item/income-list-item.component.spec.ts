import { IncomeListItemComponent } from './income-list-item.component';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('IncomeListItemComponent', () => {
 let spectator: Spectator<IncomeListItemComponent>;
 const createComponent = createComponentFactory(IncomeListItemComponent);

 beforeEach(() => {
   spectator = createComponent({
     props: {
       incomeItem: {
         name: 'test name',
         amount: 200,
         recurringInterval: 'monthly',
       }
     }
   });
 });

 it('should create the component', () => {
   expect(spectator.component).toBeTruthy();
 })
});
