import {Component, ComponentFactoryResolver, AfterContentInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MyMirrorDirective} from "./mirror.directive";
import {MirrorService} from "./mirror.service";
import {MeteoComponent} from "./meteo/meteo.component";
import {MirrorItem} from "./mirror-item";

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css']
})
export class MirrorComponent implements AfterContentInit {

  @ViewChild(MyMirrorDirective)
  private mirrorDirective: MyMirrorDirective;

  mirrorItems: MirrorItem[];

  constructor(private mirrorService: MirrorService) { }

  ngAfterContentInit() {
    this.mirrorItems = this.mirrorService.getAllModules();
    this.mirrorService.loadComponent(this.mirrorDirective.viewContainerRef, this.mirrorItems[0])
  }

}
