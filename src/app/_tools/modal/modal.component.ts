import {
  AfterContentInit, Component, ComponentFactoryResolver,
  ComponentRef, Inject, OnDestroy, ViewChild, ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Modal_Meteo} from './modal-meteo.component';
import {HttpClient} from '@angular/common/http';
import {SERIAL_NUMBER} from '../../../assets/config';
import {AlertService} from '../alert/alert.service';
import {Modal_Radio} from './modal-radio.component';


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  entryComponents: [Modal_Meteo, Modal_Radio],
})
export class ModalComponent implements AfterContentInit, OnDestroy {

  @ViewChild('modalContainer', {read: ViewContainerRef}) container;
  componentRef: ComponentRef<any>;
  data = {};
  childData: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public d: Object,
              private componentFactoryResolver: ComponentFactoryResolver,
              private http: HttpClient,
              private alert: AlertService) {
    this.data = d;
  }

  ngAfterContentInit(): void {
    let component = this.FindComponent(this.data['name']);
    if (component) {
      this.container.clear();
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(Modal_Radio);
      this.componentRef = this.container.createComponent(componentFactory);
      this.componentRef.instance.output.subscribe(event => this.childData = event);
    }
  }

  onValid(): void {
    const option = {
      params: {
        'serial_number': SERIAL_NUMBER,
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

  private FindComponent(name) {
    if (name === null) return null;
    switch (name) {
      case 'Météo': return Modal_Meteo;
      case 'Radio': return Modal_Radio;
      case ''           :
        return null;
    }
  }
}
