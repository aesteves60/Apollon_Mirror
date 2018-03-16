import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService }from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
              private loginS: LoginService) {
  }

  logout(){
    this.loginS.logout();
  }
}
