import {
  Component, Inject, ComponentFactoryResolver, ViewChild, AfterContentInit, ComponentRef, OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Modal_Meteo } from './modal-meteo.component';
import { HttpClient } from '@angular/common/http';
import { SERIAL_NUMBER } from '../../../assets/config';
import {AlertService} from '../alert/alert.service';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  entryComponents: [ Modal_Meteo ],
})
export class ModalComponent implements AfterContentInit, OnDestroy {

  @ViewChild("modalContainer", { read: ViewContainerRef }) container;
  componentRef : ComponentRef<any>;
  data = {};
  childData : string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public d: Object,
              private componentFactoryResolver: ComponentFactoryResolver,
              private http : HttpClient,
              private alert : AlertService) {
    this.data = d;
  }

  ngAfterContentInit(): void {
    if( this.data['component'] ) {
      this.container.clear();
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data['component']);
      this.componentRef = this.container.createComponent(componentFactory);
      //recuperer les datas de l'enfant
      this.componentRef.instance.output.subscribe(event => this.childData = event);
    }
  }

  onValid(): void {
    const option = {
      params : {
        'serial_number' : SERIAL_NUMBER,
        'module' : this.data['name'],
        'value' : this.childData
      }
    };
    this.http.get('/API/update_conf_module', option).subscribe( res =>{
        if(res['errors'] !== undefined) this.alert.error("Ville inconnu");
        else {
          this.dialogRef.close();
          this.alert.success("Modification effectuée");
        }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
