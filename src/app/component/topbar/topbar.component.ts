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


  constructor(public sidenavService: SidenavService) {  }

  ngOnInit() { }

  openSideNav() {
    this.sidenavService.toggle();
  }

}
