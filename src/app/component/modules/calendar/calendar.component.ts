import { Component, OnInit }       from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GoogleAuthService }       from "../../../auth/authGoogle.service";
import { UserService }             from "../../../service/user.service";
import { SocketService }           from "../../../service/socket.service";
import { Event }                   from '../../../model/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private user = undefined;
  private yesterday: Date;
  private events;

  constructor(private http: HttpClient,
              private user$: UserService,
              private socket$: SocketService ) {
    let today = new Date();
    this.yesterday = new Date();
    this.yesterday.setDate(today.getDate()-1);
  }

  ngOnInit() {
    this.socket$.onEvent(Event.GOOGLE_USER).subscribe(() => {
      this.loadCalendar()
    });

    this.loadCalendar()
  }

  loadCalendar(){
    if(this.user$.user) {
      this.http.get(`https://www.googleapis.com/calendar/v3/calendars/${ this.user$.user.email }/events`, {
        headers   : new HttpHeaders({
          Authorization: `Bearer ${ sessionStorage.getItem(GoogleAuthService.SESSION_STORAGE_KEY) }`
        }), params: {
          "maxResults": '10', "timeMin": this.yesterday.toISOString()
        }
      }).subscribe(res => this.events = res['items']);
    }
  }

}
