import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appContentModal]'
})
export class ContentModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
