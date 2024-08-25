import { ListItemComponent } from './list-item.component';
import { createComponentFactory, Spectator} from '@ngneat/spectator/jest';

describe('ListItemComponent', () => {
  let spectator: Spectator<ListItemComponent>;
  const createComponent = createComponentFactory(ListItemComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

});
