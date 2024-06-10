import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() imageName!: number ;
  @Input() userName: string = '';
  @Input() albumName!: number;
  @Output() closeModal = new EventEmitter<false>();

  close() {
    this.closeModal.emit(false);
  }

  emitClose() {
    // Implement your download logic here (optional)
    this.closeModal.emit(false);
  }
}