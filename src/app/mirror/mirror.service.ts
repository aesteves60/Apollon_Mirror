import {Component, ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {MirrorItem} from "./mirror-item";
import {MeteoComponent} from "./meteo/meteo.component";

@Injectable()
export class MirrorService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


  loadComponent(viewContainerRef: ViewContainerRef, mirrorItem: MirrorItem) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(mirrorItem.component);
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
  }

  getAllPosts() {
    return [
      new MirrorItem(MeteoComponent, {name: 'Angular 2',
        description: 'Angular is a platform that makes it easy to build applications with the web.'})
    ];
  }
}
