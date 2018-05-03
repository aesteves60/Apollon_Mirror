import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {HttpClient}                                             from '@angular/common/http';
import { Config }                                               from '../../assets/config'
import { Type }                                                 from '@angular/core';
import { Observable }                                           from "rxjs/Observable";
import has = Reflect.has;

@Injectable()
export class MirrorService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private http : HttpClient) {}

  loadComponent(viewContainerRef: ViewContainerRef, mirrorItem: MirrorItem): void {
    if( mirrorItem.component !== null ) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(mirrorItem.component);
      viewContainerRef.clear();
      let componentRef = viewContainerRef.createComponent(componentFactory);
    }
  }

  getMirror(): Observable<any> {
    return this.http.get('/API/get_mirror', { params : { serial_number :  Config.SERIAL_NUMBER } })
             .map(res => res);
  }

  updateMirror(email: string, hashpassword: string = null): Observable<any>{
    let options;
    console.log(email, hashpassword);
    if(hashpassword){
      options = {
        params : {
          serial_number : Config.SERIAL_NUMBER,
          password      : hashpassword,
          email         : email
        }
      };
    } else {
      options = {
        params : {
          serial_number : Config.SERIAL_NUMBER,
          email         : email
        }
      };
    }
    console.log(options);
    return this.http.get('/API/update_mirror', options)
  }

}

export class MirrorItem {
  constructor(public component: Type<any>, public data: any) {}
}

