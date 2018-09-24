import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../environments/config';
import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeteoComponent } from '../component/modules/meteo/meteo.component';
import { TraficComponent } from '../component/modules/trafic/trafic.component';
import { ActualiteComponent } from '../component/modules/actualite/actualite.component';
import { LequipeComponent } from '../component/modules/lequipe/lequipe.component';
import { RadioComponent } from '../component/modules/radio/radio.component';
import { CalendarComponent } from '../component/modules/calendar/calendar.component';
import { GmailComponent } from '../component/modules/gmail/gmail.component';

@Injectable ()
export class MirrorService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient) {
  }

  loadComponent(viewContainerRef: ViewContainerRef, mirrorItem: MirrorItem): Object {
    if (mirrorItem) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory (mirrorItem.component);
      viewContainerRef.clear ();
      return viewContainerRef.createComponent (componentFactory);
    } else {
      viewContainerRef.clear ();
    }
  }

  getMirror(): Observable<any> {
    return this.http.get (`/apipollon/mirror/${Config.SERIAL_NUMBER}`)
      .map (res => res);
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
    return this.http.put(`/apipollon/mirror${Config.SERIAL_NUMBER}`, options);
  }

  getMirorItem() {
    return [
      new MirrorItem (MeteoComponent, 'Météo'),
      new MirrorItem (TraficComponent, 'Trafic routier'),
      new MirrorItem (ActualiteComponent, 'Actualité'),
      new MirrorItem (LequipeComponent, 'L\'Equipe'),
      new MirrorItem (RadioComponent, 'Radio'),
      new MirrorItem (CalendarComponent, 'Calendrier'),
      new MirrorItem (GmailComponent, 'Email')];
  }

}

export class MirrorItem {
  constructor(public component: Type<any>, public name: string) {
  }
}

