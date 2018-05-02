import { Injectable } from '@angular/core';
import {HttpClient}   from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject }    from "rxjs/Subject";
import BasicProfile = gapi.auth2.BasicProfile;

@Injectable()
export class UserService {

  private static _user: BasicProfile = undefined;
  private subject            = new Subject<any>();
  private _isLogged: boolean = false;

  constructor(private http: HttpClient){}

  public setUser(user: BasicProfile): void {
    UserService._user = user;
    this.subject.next(UserService._user);
  }

  public getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  public get user(){
    return UserService._user;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }
}