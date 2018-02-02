import { Type } from '@angular/core';

export class MirrorItem {
  constructor(public component: Type<any>, public data: any) {}
}
