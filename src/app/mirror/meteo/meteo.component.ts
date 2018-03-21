import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jourMeteo } from './jourMeteo';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  tabMeteo: jourMeteo[] = [] ;
  currentUrl: string;
  heure:string;
  constructor( private http: HttpClient,private router:Router) { }



  ngOnInit() {
    this.currentUrl = this.router.url;
    let date = new Date();
    this.heure = date.getHours()+" : "+date.getMinutes();
    this.http.get('API/meteo')
    .subscribe(res =>
      this.traiteData(res)
    );
  }
  traiteData(res){
    /*

    tabMeteo => 0 condition actuelle
    tabMeteo => 1 condition de la journée actuelle
    tabMeteo => 1+n condition futur
     */
    console.log(res);

    let compteur = 0;
    for (let jour in res) {
      if(jour=='current_condition'){
        let today: jourMeteo = new jourMeteo(res[jour]['date'], res[jour]['condition'], res[jour]['condition_key'], null, null, res[jour]['tmp']);
        this.tabMeteo.push(today);
      }else if(jour=='city_info'){
        continue;
      }else if(jour=='fcst_day_'+compteur){
        let day :jourMeteo = new jourMeteo(res['fcst_day_'+compteur]['date'],res['fcst_day_'+compteur]['condition'],
                             res['fcst_day_'+compteur]['condition_key'], res['fcst_day_'+compteur]['tmax'],
                             res['fcst_day_'+compteur]['tmin'],null);
        this.tabMeteo.push(day);
        compteur ++;
      }
    }
    console.log(this.tabMeteo);
  }

}
