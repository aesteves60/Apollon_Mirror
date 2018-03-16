import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
  private modals: Array<any>;

  constructor() {
    this.modals = ['1'];
  }

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  registerModal(newModal: ModalComponent): void {
    const modal = this.findModal(newModal.modalId);

    // Delete existing to replace the modal
    if (modal) {
      this.modals.splice(this.modals.indexOf(modal));
    }
    this.modals.push(newModal);
  }

  open(modalId: string): void {
    const modal = this.findModal(modalId);
    console.log(modal);

    if (modal) {
      modal.isOpen = true;
    }
  }

  close(modalId: string, checkBlocking = false): void {
    const modal = this.findModal(modalId);
    if (modal) {
      if (checkBlocking && modal.isOpen) {
        return;
      }
      modal.isOpen = false;
      console.log(modal);
    }
  }

  private findModal(modalId: string): ModalComponent {
    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }
}
