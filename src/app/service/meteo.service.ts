import {Injectable}   from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import { Config }     from '../../environments/config';
import { jourMeteo }  from "../component/modules/meteo/jourMeteo";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MeteoService {

  tabMeteo: jourMeteo[] = [] ;
  private city : string;
  private current_temp : string;
  private wind_speed : number;
  private wind_dir : string;

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    const options = { params: {
        'serial_number': Config.SERIAL_NUMBER
      }
    };
    return this.http.get('/apipollon/meteo', options)
                    .map(res => this.traiteData(res))
  }

  private traiteData(res): jourMeteo[] {
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
    return this.tabMeteo;
  }
}
