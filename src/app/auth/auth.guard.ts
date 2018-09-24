import { Injectable }                                               from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService }                                             from "../service/login.service";
import { Router }                                                   from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private isloggin: LoginService, private router: Router ){

  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( localStorage.getItem('currentUser') ) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['login']);
    return false;
  }
}
