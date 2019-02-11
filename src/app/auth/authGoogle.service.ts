
import {of as observableOf,  Observable ,  Observer } from 'rxjs';
import { Injectable, NgZone } from "@angular/core";

import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import AuthorizeConfig = gapi.auth2.AuthorizeConfig;
import { UserService }        from "../service/user.service";


@Injectable()
export class GoogleAuthService {

  public static readonly SESSION_STORAGE_KEY: string = "accessToken";
  private GoogleAuth: GoogleAuth                     = undefined;

  constructor(private ngZone: NgZone, private user$ : UserService) {
  }


  public getAuth(): Observable<GoogleAuth> {
    if(!this.GoogleAuth) {
      return this.loadGapiAuth();
    }
    return observableOf(this.GoogleAuth);
  }

  public async signIn(): Promise<void> {
    await this.getAuth().subscribe((auth) => {
      auth.signIn().then(res => this.signInSuccessHandler(res)
        , e => { throw e });
    });
  }

  private signInSuccessHandler(googleRes: GoogleUser) {
    this.ngZone.run(() => {
      this.user$.setUser(googleRes.getBasicProfile());
      this.user$.setAccesToken(googleRes.getAuthResponse().access_token, 'Calendrier');
      sessionStorage.setItem(GoogleAuthService.SESSION_STORAGE_KEY, googleRes.getAuthResponse().access_token);
    });
  }

  public async signOut(): Promise<void> {
      await this.getAuth().subscribe((auth) => {
        try {
          this.user$.setUser(undefined);
          auth.signOut();
          sessionStorage.removeItem(GoogleAuthService.SESSION_STORAGE_KEY);
        } catch(e) { throw e }
    });
  }

  private loadGapiAuth(): Observable<GoogleAuth> {
    return Observable.create((observer: Observer<GoogleAuth>) => {
      gapi.load('auth2', () => {
        gapi.auth2.init(<AuthorizeConfig>{
          client_id: "657052571660-fjqao7sajokl30rrfavj7s32k24bn7pq.apps.googleusercontent.com",
          scope    : ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.readonly",
                      "https://www.googleapis.com/auth/gmail.readonly"].join(" "),
          response_type: 'id_token permission refresh_token'
        }).then((auth) => {
          console.log(auth);
          this.GoogleAuth = auth;
          observer.next(auth);
          observer.complete();
        });
      });
    });
  }
}
