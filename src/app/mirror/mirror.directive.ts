import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[topLeft]'
})
export class MyMirrorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
