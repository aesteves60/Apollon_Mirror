import { Component, OnInit }       from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { LoginService }   from "../../service/login.service";
import { UserService }    from "../../service/user.service";
import { User }           from "../../model/user";
import { SidenavService } from "../../service/sidenav.service";


@Component({
  selector   : 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls  : ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user: User;
  location: string = '';

  constructor(private user$: UserService,
              private sidenavService: SidenavService) {  }

  ngOnInit() {
    this.user$.getUser().subscribe(user => this.user = user);

    this.user = this.user$.user;
  }

  openSideNav() {
    this.sidenavService.toggle();
  }

}
