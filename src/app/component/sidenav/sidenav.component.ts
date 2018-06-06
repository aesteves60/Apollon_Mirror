import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher }                                    from "@angular/cdk/layout";
import { MatSidenav }                                      from '@angular/material';
import { SidenavService }                                  from "../../service/sidenav.service";


@Component({
  selector   : 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls  : ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private sidenavService: SidenavService) {

    this.mobileQuery          = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
