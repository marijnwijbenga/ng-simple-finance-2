import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ModalComponent } from './modal.component';
import spyOn = jest.spyOn;
describe('ModalComponent', () => {
  let spectator: Spectator<ModalComponent>;
  const createComponent = createComponentFactory(ModalComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should emit closeModal event when onModalClose is called', () => {
    const emitSpy = spyOn(spectator.component.closeModal, 'emit');
    const modalSpy = spyOn(spectator.component, 'onModalClose');

    const outerDiv = spectator.queryAll('div')[0];
    spectator.click(outerDiv);

    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(modalSpy).toHaveBeenCalled();
  });
});
