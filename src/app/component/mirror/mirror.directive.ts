import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[right]'
})
export class RightDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[left]'
})
export class LeftDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}


@Directive({
  selector: '[bottomCenterLeft]'
})
export class BottomCenterLeftDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[bottomCenterRight]'
})
export class BottomCenterRightDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[bottomLeft]'
})
export class BottomLeftDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[bottomRight]'
})
export class BottomRightDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
  selector: '[topLeft]'
})
export class TopLeftDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
@Directive({
  selector: '[topRight]'
})
export class TopRightDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}


