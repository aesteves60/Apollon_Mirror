import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contentModal]'
})
export class contentModal {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
