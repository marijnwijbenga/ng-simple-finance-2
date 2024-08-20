import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Output() public closeModal = new EventEmitter<boolean>();

  onModalClose() {
    this.closeModal.emit(true);
  }
}
