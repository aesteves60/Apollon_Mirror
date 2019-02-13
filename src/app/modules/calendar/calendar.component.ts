import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleAuthService } from '../../core/auth/authGoogle.service';
import { UserService } from '../../account/user.service';
import { SocketService } from '../../core/socket.service';
import { Event } from '../../core/event';
import { User } from '../../account/user';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

    private user: User;
    private yesterday: Date;
    private events;

    constructor(private http: HttpClient,
        private user$: UserService,
        private socket$: SocketService) {
        const today = new Date();
        this.yesterday = new Date();
        this.yesterday.setDate(today.getDate() - 1);
    }

    ngOnInit() {
        this.socket$.onEvent(Event.GOOGLE_USER).subscribe(() => {
            this.loadCalendar()
        });

        this.user$.getUser().subscribe(user => {
            this.user = user;
            this.loadCalendar();
        });

        this.user = this.user$.user;

        this.loadCalendar();

    }

    loadCalendar() {
        if (this.user && this.user.email !== 'null') {
            this.http.get(`https://www.googleapis.com/calendar/v3/calendars/${this.user.email}/events`, {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${sessionStorage.getItem(GoogleAuthService.SESSION_STORAGE_KEY)}`
                }), params: {
                    'maxResults': '10', 'timeMin': this.yesterday.toISOString()
                }
            }).subscribe(res => {
                console.log(res);
                this.events = res['items']
            });
        }
    }

}
