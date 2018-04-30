import { Injectable } from '@angular/core';
import {HttpClient}   from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject }    from "rxjs/Subject";
import BasicProfile = gapi.auth2.BasicProfile;

@Injectable()
export class UserService {


  private user: BasicProfile = undefined;
  private subject            = new Subject<any>();
  private _isLogged: boolean = false;


  constructor(private http: HttpClient){}

  public setUser(user: BasicProfile): void {
    this.user = user;
    this.subject.next(this.user);
  }

  public getUser(): Observable<any> {
    return this.subject.asObservable();
  }


  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }
}
