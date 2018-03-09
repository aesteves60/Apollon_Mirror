import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sha256 } from 'crypto-js/sha256';


@Injectable()
export class LoginService {

  public token: string;
  private sha256 : Sha256;

  constructor(private router: Router) {
    this.token = null;
  }

  login(password: string, token: string): boolean {
    const hashPassword = this.sha256.constructor;
    console.log(hashPassword);
    if (password == '1234'){
      if (token) {
        // set token property
        this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));

        this.router.navigateByUrl('/personalize');

        return true;
      } else {
        return false;
      }
    }
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

}
