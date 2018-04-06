import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modal-content]',
})
export class Modal_Content {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
