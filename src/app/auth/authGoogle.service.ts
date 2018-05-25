import { Injectable, NgZone } from "@angular/core";
import { Observable }         from "rxjs/Observable";
import { Observer }           from "rxjs/Observer";
import 'rxjs/add/observable/of';
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
    return Observable.of(this.GoogleAuth);
  }

  public async signIn(): Promise<void> {
    await this.getAuth().subscribe((auth) => {
      auth.signIn().then(res => this.signInSuccessHandler(res)
        , e => { throw e });
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
      this.user$.setUser(res.getBasicProfile());
      this.user$.setAccesToken(res.getAuthResponse().access_token, 'Calendrier');
      sessionStorage.setItem(GoogleAuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
    });
  }

  public async signOut(): Promise<void> {
      await this.getAuth().subscribe((auth) => {
        try {
          auth.signOut();
          sessionStorage.removeItem(GoogleAuthService.SESSION_STORAGE_KEY);
          this.user$.setUser(undefined);
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
