import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeteoComponent } from '../modules/meteo/meteo.component';
import { TraficComponent } from '../modules/trafic/trafic.component';
import { ActualiteComponent } from '../modules/actualite/actualite.component';
import { LequipeComponent } from '../modules/lequipe/lequipe.component';
import { RadioComponent } from '../modules/radio/radio.component';
import { CalendarComponent } from '../modules/calendar/calendar.component';
import { GmailComponent } from '../modules/gmail/gmail.component';

const serialNumber = environment.serialNumber;

export class MirrorItem {
    constructor(public component: Type<any>, public name: string) {
    }
}

@Injectable()
export class MirrorService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient) {
    }

    loadComponent(viewContainerRef: ViewContainerRef, mirrorItem: MirrorItem): Object {
        if (mirrorItem) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(mirrorItem.component);
            viewContainerRef.clear();
            return viewContainerRef.createComponent(componentFactory);
        } else {
            viewContainerRef.clear();
        }
    }

    getMirror(): Observable<any> {
        return this.http.get(`/apipollon/mirror/${serialNumber}`)
            .pipe(map(res => res));
    }

    updateMirror(email: string, hashpassword: string = null): Observable<any> {
        let options;
        if (hashpassword) {
            options = {
                params: { password: hashpassword, email: email }
            };
        } else {
            options = {
                params: { email: email }
            };
        }
        return this.http.put(`/apipollon/mirror${serialNumber}`, options);
    }

    getMirorItem() {
        return [
            new MirrorItem(MeteoComponent, 'Météo'),
            new MirrorItem(TraficComponent, 'Trafic routier'),
            new MirrorItem(ActualiteComponent, 'Actualité'),
            new MirrorItem(LequipeComponent, 'L\'Equipe'),
            new MirrorItem(RadioComponent, 'Radio'),
            new MirrorItem(CalendarComponent, 'Calendrier'),
            new MirrorItem(GmailComponent, 'Email')];
    }
}
