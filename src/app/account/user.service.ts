import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SocketService } from '../core/socket.service';
import { Event } from '../core/event';
import { environment } from '../../environments/environment';
import { User } from './user';

const serialNumber = environment.serialNumber;

@Injectable()
export class UserService {

    private subject = new Subject<any>();

    constructor(private http: HttpClient,
        private socket$: SocketService) {
        this.user;
    }

    private static _user = new User();

    public get user(): User {
        if (UserService._user.email === null || UserService._user.email === '') {
            this.getSaveUser().then(res => {
                if (res[0] && res[0]['email']) {
                    UserService._user.email = res[0]['email'];
                    UserService._user.fullname = res[0]['firstname'] + ' ' + res[0]['name'];
                    UserService._user.name = res[0]['name'];
                    UserService._user.firstname = res[0]['firstname'];
                    UserService._user.image = res[0]['imageURL'];
                    this.subject.next(UserService._user);
                }
                return UserService._user;
            });
        } else {
            return UserService._user;
        }
    }

    public setUser(_user: any): void {
        if (_user) {
            UserService._user.email = _user.getEmail();
            UserService._user.fullname = _user.getName();
            UserService._user.name = _user.getFamilyName();
            UserService._user.firstname = _user.getGivenName();
            UserService._user.image = _user.getImageUrl();
        } else {
            UserService._user.email = 'null';
            UserService._user.fullname = 'null';
            UserService._user.name = 'null';
            UserService._user.firstname = 'null';
            UserService._user.image = 'null';
        }

        this.setSaveUser(UserService._user);
        this.socket$.doEmit(Event.GOOGLE_USER, _user);
        this.subject.next(UserService._user);
    }

    public getUser(): Observable<User> {
        return this.subject.asObservable();
    }

    public setAccesToken(_value, _module: string): void {
        const options = {
            params: {
                serial_number: serialNumber,
                value: _value,
                module: _module
            }
        };
        this.http.get('/add_google_token', options).subscribe(res => res);
    }

    private getSaveUser(): Promise<any> {
        return this.http.get(`/users/${serialNumber}`).toPromise()
    }

    private setSaveUser(_user: User): void {
        const options = {
            params: {
                name: _user.name,
                firstname: _user.firstname,
                email: _user.email,
                imageURL: _user.imageUrl
            }
        };
        this.http.put(`/users/${serialNumber}`, options)
            .subscribe(res => res,
                error => console.log(error));
    }
}
