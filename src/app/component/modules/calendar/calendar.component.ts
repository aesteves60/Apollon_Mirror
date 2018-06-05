import { Component, OnInit }       from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GoogleAuthService }       from "../../../auth/authGoogle.service";
import { UserService }             from "../../../service/user.service";
import { SocketService }           from "../../../service/socket.service";
import { Event }                   from '../../../model/event';
import { User }                    from "../../../model/user";

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
              private socket$: SocketService ) {
    let today = new Date();
    this.yesterday = new Date();
    this.yesterday.setDate(today.getDate()-1);
  }

  ngOnInit() {
    this.socket$.onEvent(Event.GOOGLE_USER).subscribe(() => {
      this.loadCalendar()
    });

    this.user$.getUser().subscribe(user => {
      this.user = user;
      this.loadCalendar();
    });
  }

  loadCalendar(){
    console.log(this.user);
    if(this.user && this.user.email !== 'null') {
      this.http.get(`https://www.googleapis.com/calendar/v3/calendars/${ this.user.email }/events`, {
        headers   : new HttpHeaders({
          Authorization: `Bearer ${ sessionStorage.getItem(GoogleAuthService.SESSION_STORAGE_KEY) }`
        }), params: {
          "maxResults": '10', "timeMin": this.yesterday.toISOString()
        }
      }).subscribe(res => {
        console.log(res);
        this.events = res['items']
      });
    }
  }

}
