import { ListComponent } from './list.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  const createComponent = createComponentFactory(ListComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });


});
