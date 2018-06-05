import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router }            from '@angular/router';
import { MediaMatcher }     from '@angular/cdk/layout';

import { LoginService }      from "../../service/login.service";
import { UserService }       from "../../service/user.service";
import { User }              from "../../model/user";

import { MatSidenavModule } from '@angular/material';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user : User;
  show : boolean = false;
  events: string[] = [];
  opened: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private router: Router,
              private loginS: LoginService,
              private user$: UserService,
              changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.user$.getUser().subscribe(user => this.user = user);
  }

  logout(){
    this.loginS.logout();
  }


}
