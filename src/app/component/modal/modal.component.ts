import {
    AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, Inject, OnDestroy, Type, ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ModalRadioComponent } from './modal-radio.component';
import { ModalMeteoComponent } from './modal-meteo.component';
import { ContentModalDirective } from './modal.directive';
import { ModalTraficComponent } from './modal-trafic.component';
import { AlertService } from '../../shared/alert/alert.service';
import { SocketService } from '../../core/socket.service';
import { Event } from '../../core/event';

export class ModalContent {
    constructor(public component: Type<any>, public name: string) {
    }
}

const serialNumber = environment.serialNumber;

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    entryComponents: [ModalMeteoComponent, ModalRadioComponent, ModalTraficComponent]
})
export class ModalComponent implements AfterContentInit, OnDestroy {

    @ViewChild(ContentModalDirective) private contentModal: ContentModalDirective;
    componentRef: ComponentRef<any>;
    childData: string;

    constructor(public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Object,
        private componentFactoryResolver: ComponentFactoryResolver,
        private http: HttpClient,
        private alert: AlertService) { }

    ngAfterContentInit(): void {
        const content = this.getModalContent().find(c => this.data['name'] === c.name);
        if (content) {
            const componentFact = this.componentFactoryResolver.resolveComponentFactory(content.component);
            this.contentModal.viewContainerRef.clear();
            this.componentRef = this.contentModal.viewContainerRef.createComponent(componentFact);
            this.componentRef.instance.output.subscribe(event => this.childData = event);
        }
    }

    onValid(): void {
        const option = {
            params: { 'value': this.childData }
        };
        this.http.put(`/modules/${serialNumber}/${this.data['name']}`, option).subscribe(res => {
            this.dialogRef.close();
            this.alert.success('Modification effectuée');

        }, error => {
            this.alert.error(error.error);
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
            new ModalContent(ModalRadioComponent, 'Radio'),
            new ModalContent(ModalMeteoComponent, 'Météo'),
            new ModalContent(ModalTraficComponent, 'Trafic routier')
        ]

    }
}
