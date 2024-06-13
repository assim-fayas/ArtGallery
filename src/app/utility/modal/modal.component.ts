import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // get the data from image component
  @Input() imageName!: number ;
  @Input() userName: string = '';
  @Input() albumName!: number;

  //emit to image component
  @Output() closeModal = new EventEmitter<false>();

//closing the modal
  close() {
    this.closeModal.emit(false);
  }

  //image downloading
  onDownload(imageUrl: string) {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'IMG_0000' + this.imageName + '.JPG';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); 
      })
      .catch(error => console.error('Download error:', error));
  }
  
}
