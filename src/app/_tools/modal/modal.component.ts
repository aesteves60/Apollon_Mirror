import {Component, Inject, ComponentFactoryResolver, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Modal_Content } from './modal-content.directive';
import { Modal_Meteo } from './modal-meteo.component';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  //entryComponents: [ Modal_Meteo ]
})
export class ModalComponent {
  @ViewChild(Modal_Content) modalContent_dir: Modal_Content;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private componentFactoryResolver: ComponentFactoryResolver)
  {
    //let componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.component);
    //let viewContainerRef = this.modalContent_dir.viewContainerRef;
    //viewContainerRef.clear();

    //let componentRef = viewContainerRef.createComponent(componentFactory);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
