
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as shajs from 'sha.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const serialNumber = environment.serialNumber;

@Injectable()
export class LoginService {

    public token: string;

    constructor(private router: Router, private http: HttpClient) {
        this.token = null;
    }

    login(password: string, token: string): Observable<boolean> {
        return this.getAuthentification(password).pipe(
            map(res => {
                if (token && res === true) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ token: token }));
                    this.router.navigateByUrl('/personalize');
                    return true;
                } else {
                    return false;
                }
            }));
    }

    getAuthentification(password: string): Observable<any> {
        const hashpassword = shajs('sha256').update(password).digest('hex');

        const options = {
            params: {
                'serial_number': serialNumber,
                'password': hashpassword
            }
        };
        return this.http.get('/login', options);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('/login');
    }
}
