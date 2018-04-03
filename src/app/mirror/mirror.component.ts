import {Component, AfterContentInit, ViewChild, OnInit} from '@angular/core';
import {
  BottomCenterLeftDirective, BottomCenterRightDirective, BottomLeftDirective,
  BottomRightDirective, LeftDirective, RightDirective, TopLeftDirective, TopRightDirective
} from './mirror.directive';
import { MirrorService } from "./mirror.service";
import { MirrorItem } from "./mirror.service";
//component
import {MeteoComponent} from './modules/meteo/meteo.component';
import {EmptyComponent} from './modules/empty/empty.component';
import {LequipeComponent} from './modules/lequipe/lequipe.component';
import {ActualiteComponent} from './modules/actualite/actualite.component';
import {TraficComponent} from './modules/trafic/trafic.component';

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css'],
  entryComponents: [ MeteoComponent, TraficComponent, LequipeComponent, ActualiteComponent, EmptyComponent ]
})
export class MirrorComponent implements AfterContentInit, OnInit {

  @ViewChild(BottomCenterLeftDirective)
  private bottomCenterLeftDirective: BottomCenterLeftDirective;
  @ViewChild(BottomCenterRightDirective)
  private bottomCenterRightDirective: BottomCenterRightDirective;
  @ViewChild(BottomLeftDirective)
  private bottomLeftDirective: BottomLeftDirective;
  @ViewChild(BottomRightDirective)
  private bottomRightDirective: BottomRightDirective;
  @ViewChild(RightDirective)
  private rightDirective: RightDirective;
  @ViewChild(LeftDirective)
  private leftDirective: LeftDirective;
  @ViewChild(TopRightDirective)
  private topRightDirective: TopRightDirective;
  @ViewChild(TopLeftDirective)
  private topLeftDirective: TopLeftDirective;

  private list_modules = [];
  show = true;

  constructor(private mirrorService: MirrorService) { }

  ngOnInit() {
    setTimeout(()=> this.show = false, 5000);

  }

  ngAfterContentInit() {
     this.mirrorService.getAllModules().subscribe(res => {
       this.list_modules = [
           new MirrorItem(this.FindComponent(res[0] ? res[0] : null), null),
           new MirrorItem(this.FindComponent(res[1] ? res[1] : null), null),
           new MirrorItem(this.FindComponent(res[2] ? res[2] : null), null),
           new MirrorItem(this.FindComponent(res[3] ? res[3] : null), null),
           new MirrorItem(this.FindComponent(res[4] ? res[4] : null), null),
           new MirrorItem(this.FindComponent(res[5] ? res[5] : null), null),
           new MirrorItem(this.FindComponent(res[6] ? res[6] : null), null),
           new MirrorItem(this.FindComponent(res[7] ? res[7] : null), null),
        ];
        this.mirrorService.loadComponent(this.topLeftDirective.viewContainerRef, this.list_modules[0]);
        this.mirrorService.loadComponent(this.topRightDirective.viewContainerRef, this.list_modules[1]);
        this.mirrorService.loadComponent(this.leftDirective.viewContainerRef, this.list_modules[2]);
        this.mirrorService.loadComponent(this.rightDirective.viewContainerRef, this.list_modules[3]);
        this.mirrorService.loadComponent(this.bottomLeftDirective.viewContainerRef, this.list_modules[4]);
        this.mirrorService.loadComponent(this.bottomRightDirective.viewContainerRef, this.list_modules[5]);
        this.mirrorService.loadComponent(this.bottomCenterLeftDirective.viewContainerRef, this.list_modules[6]);
        this.mirrorService.loadComponent(this.bottomCenterRightDirective.viewContainerRef, this.list_modules[7]);
        return this.list_modules
     });
  }

  private FindComponent(module) {
    if( module === null ) return EmptyComponent;
    switch (module.name){
      case 'Météo'          : return MeteoComponent;
      case 'Trafic routier' : return TraficComponent;
      case 'Actualité'      : return ActualiteComponent;
      case 'L\'Equipe'      : return LequipeComponent;
      case ''               : return EmptyComponent;
    }
  }

  public pageRefresh() : void {
    location.reload();
  }
}
