import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jourMeteo } from './jourMeteo';
import 'rxjs/add/operator/map';
import {SERIAL_NUMBER} from '../../../../assets/config';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  tabMeteo: jourMeteo[] = [] ;
  private city : string;
  private current_temp : string;
  private wind_speed : number;
  private wind_dir : string;

  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const options = { params: {
        'serial_number': SERIAL_NUMBER
      }
    };
    this.http.get('/API/meteo', options)
    .subscribe(res => this.traiteData(res));
  }

  private traiteData(res){
    /*
    tabMeteo => 0 condition actuelle
    tabMeteo => 1 condition de la journée actuelle
    tabMeteo => 1+n condition futur
     */
    let compteur = 0;
    for (let jour in res) {
      if(jour === 'current_condition'){
        this.current_temp = res['current_condition']['tmp'];
        this.wind_speed = Number(res['current_condition']['wnd_spd']);
        this.wind_dir = res['current_condition']['wnd_dir'];
      }else if(jour === 'city_info'){
        this.city = res['city_info']['name'];
      }else if(jour === 'fcst_day_'+compteur){
        let day :jourMeteo = new jourMeteo(res['fcst_day_'+compteur]['date'],res['fcst_day_'+compteur]['condition'],
                             res['fcst_day_'+compteur]['condition_key'], res['fcst_day_'+compteur]['tmax'],
                             res['fcst_day_'+compteur]['tmin'],this.current_temp ? this.current_temp : null,
                             this.wind_speed ? this.wind_speed : 0,this.wind_dir ? this.wind_dir : null);
        this.current_temp = null;
        this.wind_speed = 0;
        this.wind_dir = null;
        this.tabMeteo.push(day);
        compteur ++;
      }
    }
  }

}
