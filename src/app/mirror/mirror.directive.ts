import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appRight]'
})
export class RightDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
    selector: '[appLeft]'
})
export class LeftDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}


@Directive({
    selector: '[appBottomCenterLeft]'
})
export class BottomCenterLeftDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
    selector: '[appBottomCenterRight]'
})
export class BottomCenterRightDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
    selector: '[appBottomLeft]'
})
export class BottomLeftDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
    selector: '[appBottomRight]'
})
export class BottomRightDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Directive({
    selector: '[appTopLeft]'
})
export class TopLeftDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
@Directive({
    selector: '[appTopRight]'
})
export class TopRightDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}


