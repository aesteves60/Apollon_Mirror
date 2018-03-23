import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {MirrorItem} from "./mirror-item";
import {HttpClient} from '@angular/common/http';
import {SERIAL_NUMBER} from '../../assets/config';


@Injectable()
export class MirrorService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private http : HttpClient) { }


  loadComponent(viewContainerRef: ViewContainerRef, mirrorItem: MirrorItem) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(mirrorItem.component);
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
  }

  getAllModules() {
    let options = {
      params : {
        serial_number : SERIAL_NUMBER
      }
    };
    return this.http.get('/API/get_views_mirror', options).map(res => res);
  }

}
