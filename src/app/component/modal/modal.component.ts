import {
  AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, Inject, OnDestroy, Type, ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient}                   from '@angular/common/http';
import {Config}                       from '../../../assets/config';
import {Modal_Radio}                  from './modal-radio.component';
import {Modal_Meteo}                  from './modal-meteo.component';
import { contentModal }               from "./modal.directive";


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  entryComponents: [Modal_Meteo, Modal_Radio]
})
export class ModalComponent implements AfterContentInit, OnDestroy {

  @ViewChild(contentModal) private contentModal: contentModal;
  componentRef: ComponentRef<any>;
  data = {};
  childData: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public d: Object,
              private componentFactoryResolver: ComponentFactoryResolver,
              private http: HttpClient)
  { this.data = d }

  ngAfterContentInit(): void {
    let content = this.getModalContent().find(c => this.data['name'] === c.name);
    if (content) {
      let componentFact = this.componentFactoryResolver.resolveComponentFactory(content.component);
      this.contentModal.viewContainerRef.clear();
      this.componentRef = this.contentModal.viewContainerRef.createComponent(componentFact);
      this.componentRef.instance.output.subscribe(event => this.childData = event);
    }
  }

  onValid(): void {
    const option = {
      params: {
        'serial_number': Config.SERIAL_NUMBER,
        'module': this.data['name'],
        'value': this.childData
      }
    };
    this.http.get('/API/update_conf_module', option).subscribe(res => {
      this.dialogRef.close();
      /*if (res['errors'] !== undefined) this.alert.error('Ville inconnu');
      else {
        this.dialogRef.close();
        this.alert.success('Modification effectuée');
      }*/
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  private getModalContent(): Array<any> {
    return [
      new Modal_Content(Modal_Radio, 'Radio'),
      new Modal_Content(Modal_Meteo, 'Météo')
    ]

  }
}

export class Modal_Content {
  constructor(public component: Type<any>, public name:string) {}
}
