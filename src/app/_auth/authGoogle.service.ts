import { Injectable, NgZone } from "@angular/core";
import { Observable }         from "rxjs/Observable";
import { Observer }           from "rxjs/Observer";
import 'rxjs/add/observable/of';
import { Subject }            from "rxjs/Subject";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import BasicProfile = gapi.auth2.BasicProfile;


@Injectable()
export class GoogleAuthService {

  public static readonly SESSION_STORAGE_KEY: string = "accessToken";
  private GoogleAuth: GoogleAuth                     = undefined;
  private user: BasicProfile                         = undefined;
  private subject                                    = new Subject<any>();
  private _isLogged: boolean                         = false;

  constructor(private ngZone: NgZone) {
  }


  get isLogged(): boolean {
    return this._isLogged;
  }

  public getAuth(): Observable<GoogleAuth> {
    if(!this.GoogleAuth) {
      return this.loadGapiAuth();
    }
    return Observable.of(this.GoogleAuth);
  }

  public signIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getAuth().subscribe((auth) => {
        auth.signIn().then(res => {
          this.signInSuccessHandler(res);
        }, e => {
          console.warn(e);
          reject(e);
        });
      });
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
      this.setUser(res.getBasicProfile());
      console.log(res.getAuthResponse(), res);
      this._isLogged = true;
      sessionStorage.setItem(GoogleAuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
    });
  }

  public signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getAuth().subscribe((auth) => {
        try {
          auth.signOut();
        } catch(e) {
          console.error(e);
          reject(e);
        }
        sessionStorage.removeItem(GoogleAuthService.SESSION_STORAGE_KEY);
        resolve();
      });
    });
  }

  public setUser(user: BasicProfile): void {
    this.user = user;
    this.subject.next(this.user);
  }

  public getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  private loadGapiAuth(): Observable<GoogleAuth> {
    return Observable.create((observer: Observer<GoogleAuth>) => {
      gapi.load('client:auth2', () => {
        gapi.auth2.init({
          client_id: "657052571660-fjqao7sajokl30rrfavj7s32k24bn7pq.apps.googleusercontent.com",
          //discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope    : ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.readonly"].join(" ")
        }).then((auth) => {
          this.GoogleAuth = auth;
          observer.next(auth);
          observer.complete();
        });
      });
    });
  }
}
