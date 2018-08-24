import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher }                                    from "@angular/cdk/layout";
import { MatSidenav }                                      from '@angular/material';
import { SidenavService }                                  from "../../service/sidenav.service";
import { LoginService }                                    from "../../service/login.service";
import { NavigationEnd, Router }                           from "@angular/router";


@Component({
  selector   : 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls  : ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private location: string;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private sidenavService: SidenavService,
              private router: Router,
              private loginS: LoginService) {

    this.mobileQuery          = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.location = this.router.url;

    this.router.events.subscribe((path) => {
      if( path instanceof NavigationEnd ) {
        this.location = path.url
      }
    })
  }

  logout() {
    this.loginS.logout();
    this.sidenavService.close();
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
