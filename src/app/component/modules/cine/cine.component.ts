import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {
  URL_API="https://api.themoviedb.org/3/movie/now_playing?api_key=6afd703d3cc394780cd541b624503a78&language=fr&page=1";
  films;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.GetFilmsNowPlaying();
  }

  GetFilmsNowPlaying(){
   /* this.http.get(this.URL_API)
      .subscribe(data => {
         this.films = data;
         return this.films.results;
      } );*/
  }

}
