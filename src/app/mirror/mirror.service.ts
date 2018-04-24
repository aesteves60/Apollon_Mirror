import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERIAL_NUMBER} from '../../assets/config'
import { Type } from '@angular/core';



@Injectable()
export class MirrorService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private http : HttpClient) { }


  loadComponent(viewContainerRef: ViewContainerRef, mirrorItem: MirrorItem) {
    if( mirrorItem.component !== null ) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(mirrorItem.component);
      viewContainerRef.clear();
      let componentRef = viewContainerRef.createComponent(componentFactory);
    }
  }

  getAllModules() {
    let options = {
      params : {
        serial_number : SERIAL_NUMBER
      }
    };
    return this.http.get('/API/get_views_mirror', options).map(res => res);
  }

  getMirror() {
    return this.http.get('/API/get_mirror', { params : { serial_number :  SERIAL_NUMBER } })
             .map(res => res);
  }

  updateMirror(options : Object){
    return this.http.get('/API/update_mirror', options)
        .map( data => data).catch(error => error);
  }

}

export class MirrorItem {
  constructor(public component: Type<any>, public data: any) {}
}

