import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router }                           from '@angular/router';

import { LoginService }   from "../../service/login.service";
import { UserService }    from "../../service/user.service";
import { User }           from "../../model/user";
import { SidenavService } from "../../service/sidenav.service";


@Component({
  selector   : 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls  : ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, AfterViewInit {

  user: User;
  location: string = '';

  constructor(private router: Router,
              private loginS: LoginService,
              private user$: UserService,
              private sidenavService: SidenavService) {

  }

  ngOnInit() {
    this.user$.getUser().subscribe(user => this.user = user);
  }

  ngAfterViewInit() {
    this.location = this.router.url;
    console.log(this.location);
  }

  logout() {
    this.loginS.logout();
  }

  openSideNav() {
    this.sidenavService.toggle();

    this.location = this.router.url;
    console.log(this.location);
  }

}
