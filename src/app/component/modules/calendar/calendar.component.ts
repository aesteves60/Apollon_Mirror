import { Component, OnInit }       from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GoogleAuthService }       from "../../../auth/authGoogle.service";
import { UserService }             from "../../../service/user.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private user = undefined;
  private yesterday: Date;
  private events;

  constructor(private http :HttpClient,
              private user$ :UserService) {
    let today = new Date();
    this.yesterday = new Date();
    this.yesterday.setDate(today.getDate()-1);
  }

  ngOnInit() {
    this.user$.getUser().subscribe(user => {
      console.log(user);
      return this.user = user
    });
    console.log(this.yesterday.toISOString());

    this.http.get(`https://www.googleapis.com/calendar/v3/calendars/alexandre.esteves.ae@gmail.com/events`,
      {headers: new HttpHeaders({
                Authorization: `Bearer ${ sessionStorage.getItem(GoogleAuthService.SESSION_STORAGE_KEY) }`
            }),
            params:{
                "maxResults":'10',
                "timeMin":this.yesterday.toISOString()
            }
      }).subscribe(res => {
        console.log(res);
        return this.events = res['items'];
    });
  }
}
