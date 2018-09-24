import { Component, OnInit }       from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService }             from "../../../service/user.service";
import { GoogleAuthService }       from "../../../auth/authGoogle.service";

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  private user = undefined;
  private emails;


  constructor(private http :HttpClient,
              private user$ :UserService) { }

  ngOnInit() {
    this.user = this.user$.user;
    if(this.user){
      this.http.get(`https://www.googleapis.com/calendar/v3/calendars/${ this.user.getEmail() }/events`,
        {headers: new HttpHeaders({
            Authorization: `Bearer ${ sessionStorage.getItem(GoogleAuthService.SESSION_STORAGE_KEY) }`
          }),
          params:{
            "maxResults":'10',
          }
        }).subscribe(res => {
        console.log(res);
        return this.emails = res['items'];
      });
    }
  }

}
