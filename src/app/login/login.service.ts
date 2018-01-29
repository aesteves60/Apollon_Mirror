import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  public token: string;

  constructor() {
    this.token = null;
  }

  login(password: string, token: string): boolean {
    if (password == '1234'){
      if (token) {
        // set token property
        this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));

        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }
    }

  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
