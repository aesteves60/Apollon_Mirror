import { AfterContentInit, Component,
  OnInit, ViewChild, } from '@angular/core';
import {
  BottomCenterLeftDirective,
  BottomCenterRightDirective,
  BottomLeftDirective,
  BottomRightDirective,
  LeftDirective,
  RightDirective,
  TopLeftDirective,
  TopRightDirective
}                            from './mirror.directive';
import { MirrorService }     from '../../service/mirror.service';
import { ModuleService }     from "../../service/module.service";

//component
import { MeteoComponent }     from '../modules/meteo/meteo.component';
import { LequipeComponent }   from '../modules/lequipe/lequipe.component';
import { ActualiteComponent } from '../modules/actualite/actualite.component';
import { TraficComponent }    from '../modules/trafic/trafic.component';
import { RadioComponent }     from "../modules/radio/radio.component";
import { CalendarComponent }  from "../modules/calendar/calendar.component";
import { GmailComponent }     from "../modules/gmail/gmail.component";

@Component({
  selector       : 'app-mirror',
  templateUrl    : './mirror.component.html',
  styleUrls      : ['./mirror.component.css'],
  entryComponents: [MeteoComponent, TraficComponent, LequipeComponent, ActualiteComponent, RadioComponent, CalendarComponent, GmailComponent]
})
export class MirrorComponent implements AfterContentInit, OnInit {

  @ViewChild(BottomCenterLeftDirective) private bottomCenterLeftDirective: BottomCenterLeftDirective;
  @ViewChild(BottomCenterRightDirective) private bottomCenterRightDirective: BottomCenterRightDirective;
  @ViewChild(BottomLeftDirective) private bottomLeftDirective: BottomLeftDirective;
  @ViewChild(BottomRightDirective) private bottomRightDirective: BottomRightDirective;
  @ViewChild(RightDirective) private rightDirective: RightDirective;
  @ViewChild(LeftDirective) private leftDirective: LeftDirective;
  @ViewChild(TopRightDirective) private topRightDirective: TopRightDirective;
  @ViewChild(TopLeftDirective) private topLeftDirective: TopLeftDirective;

  private list_modules   = [];
  private list_directive = [];

  constructor(private module$: ModuleService, private mirror$: MirrorService) { }

  ngOnInit() {
    this.list_directive = [this.topLeftDirective, this.topRightDirective, this.leftDirective, this.rightDirective,
      this.bottomLeftDirective, this.bottomCenterLeftDirective, this.bottomCenterRightDirective, this.bottomRightDirective];
  }

  ngAfterContentInit() {
    this.loadView();
  }

  loadView(): void {
    this.module$.getViews().subscribe(res => {
      for (let i = 0; i < res['length']; i++) {
        if( res[i] ){
          this.list_modules.push(this.mirror$.getMirorItem().find(item => res[i]['name'] === item.name));
          this.mirror$.loadComponent(this.list_directive[i].viewContainerRef, this.list_modules[i]);
        } else {
          this.list_modules.push(null);
        }
      }
    });
  }

}
