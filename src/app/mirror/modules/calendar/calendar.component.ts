import { Component, OnInit }       from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GoogleAuthService }       from "../../../_auth/authGoogle.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private user;

  constructor(private http :HttpClient,
              private googleAuthService :GoogleAuthService) {}

  ngOnInit() {
    this.googleAuthService.getUser().subscribe(res => this.user = res);
    this.http.get(`https://www.googleapis.com/calendar/v3/calendars/alexandre.esteves.ae@gmail.com/events`,
      {headers: new HttpHeaders({
            Authorization: `Bearer ${ sessionStorage.getItem(GoogleAuthService.SESSION_STORAGE_KEY) }`,
            "timeMin": ""
          })
      }).subscribe(res => console.log(res));
  }
}
