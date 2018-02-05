import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cpMyMiroor]'
})
export class MyMirrorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
