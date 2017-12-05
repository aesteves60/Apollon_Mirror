import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
class MeteoObject {

  constructor() {

  }
}
export class MeteoComponent implements OnInit {

  constructor(private http: Http) { }
  getMeteo() {
    this.http.get('https://www.prevision-meteo.ch/services/json/lat=46.259lng=5.235')
      .subscribe((res: Response) => {
        const meteo = res.json();
        console.log(meteo);
      })
  }
  ngOnInit() {
    this.getMeteo();
  }


}