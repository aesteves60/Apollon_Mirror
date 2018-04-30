import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { LoginService }      from "../../service/login.service";
import { GoogleAuthService } from "../../auth/authGoogle.service";
import BasicProfile = gapi.auth2.BasicProfile;
import { UserService }       from "../../service/user.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user :BasicProfile;
  show : boolean = false;

  constructor(private router: Router,
              private loginS: LoginService,
              private user$: UserService) {
  }

  ngOnInit() {
    this.user$.getUser().subscribe(user => {
      this.user = user
    });
  }

  logout(){
    this.loginS.logout();
  }

}
