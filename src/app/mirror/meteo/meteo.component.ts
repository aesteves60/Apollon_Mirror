import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  constructor( private http: HttpClient) { }
  getMeteo() {
    this.http.get('https://www.prevision-meteo.ch/services/json/lat=46.259lng=5.235')
      .subscribe((res: Response) => {
        const meteo = res;
        console.log(meteo);
      })
  }
  ngOnInit() {
    this.getMeteo();
  }


}
