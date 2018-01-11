import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  URL_API = "https://restcountries.eu/rest/v2/all";
  contries;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.GetContries();
  }

  GetContries(){
    this.http.get(this.URL_API)
      .subscribe(data => this.contries = data );
  }
}
