import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    gapi.client.load('calendar', 'v3').then(() => {
      gapi.client.request({'path': '/users/me/calendarList', 'params': {
          "maxResults": 10,
          "minAccessRole": "reader"
        }}).then((res)=> console.log(res));
    })
  }

  private initializeGoogleCalendarAPI(){
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
