import { Injectable }    from '@angular/core';
import { HttpClient }    from "@angular/common/http";
import { Observable }    from "rxjs/Observable";
import { Subject }       from "rxjs/Subject";
import { SocketService } from "./socket.service";
import { Event }         from '../model/event';
import { Config }        from "../../assets/config";
import BasicProfile = gapi.auth2.BasicProfile;


@Injectable()
export class UserService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient,
              private socket$: SocketService) {}

  private static _user: BasicProfile = undefined;

  public get user(): BasicProfile {
    console.log(UserService._user);
    return UserService._user;
  }

  public setUser(_user: BasicProfile): void {
    UserService._user = _user;
    this.setSaveUser(_user);
    this.socket$.doEmit(Event.GOOGLE_USER, _user);
    this.subject.next(_user);
  }

  public getUser(): Observable<any> {
    return this.subject.asObservable();
  }

  public setAccesToken(_value, _module: string): void {
    const options = {
      params: {
        serial_number: Config.SERIAL_NUMBER,
        value        : _value,
        module       : _module
      }
    };
    this.http.get('/API/add_google_token', options).subscribe(res => res);
  }

  private getSaveUser(): void {
    const options = {
      params: {
        serial_number: Config.SERIAL_NUMBER
      }
    }
    this.http.get('/get_user', options).subscribe(res => {
      UserService._user = res
    })
  }

  private setSaveUser(_user: BasicProfile): void {
    let options: Object;
    if(_user) {
      options = {
        params: {
          serial_number: Config.SERIAL_NUMBER,
          nom          : _user.getName(),
          email        : _user.getEmail()
        }
      };
    } else {
      options = {
        params: {
          serial_number: Config.SERIAL_NUMBER,
          nom          : '',
          email        : ''
        }
      };
    }
    this.http.get('/API/update_user', options).subscribe(res => res);
  }
}
