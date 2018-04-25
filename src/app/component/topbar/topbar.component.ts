import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { LoginService }      from "../login/login.service";
import { GoogleAuthService } from "../_auth/authGoogle.service";
import BasicProfile = gapi.auth2.BasicProfile;

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user :BasicProfile;

  constructor(private router: Router,
              private loginS: LoginService,
              private googleAuthService: GoogleAuthService) {
  }

  ngOnInit() {
    this.googleAuthService.getUser().subscribe(user => {
      this.user = user
    });
  }

  logout(){
    this.loginS.logout();
  }

}
