import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JourMeteo } from './jourMeteo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const serialNumber = environment.serialNumber;

@Injectable()
export class MeteoService {

    tabMeteo: JourMeteo[] = [];
    private city: string;
    private current_temp: string;
    private wind_speed: number;
    private wind_dir: string;

    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        const options = {
            params: {
                'serial_number': serialNumber
            }
        };
        return this.http.get('/apipollon/meteo', options).pipe(
            map(res => this.traiteData(res))
        );
    }

    private traiteData(res): JourMeteo[] {
        /*
         tabMeteo => 0 condition actuelle
         tabMeteo => 1 condition de la journée actuelle
         tabMeteo => 1+n condition futur
         */
        let compteur = 0;
        for (const jour in res) {
            if (jour === 'current_condition') {
                this.current_temp = res['current_condition']['tmp'];
                this.wind_speed = Number(res['current_condition']['wnd_spd']);
                this.wind_dir = res['current_condition']['wnd_dir'];
            } else if (jour === 'city_info') {
                this.city = res['city_info']['name'];
            } else if (jour === 'fcst_day_' + compteur) {
                const day: JourMeteo = new JourMeteo(res['fcst_day_' + compteur]['date'], res['fcst_day_' + compteur]['condition'],
                    res['fcst_day_' + compteur]['condition_key'], res['fcst_day_' + compteur]['tmax'],
                    res['fcst_day_' + compteur]['tmin'], this.current_temp ? this.current_temp : null,
                    this.wind_speed ? this.wind_speed : 0, this.wind_dir ? this.wind_dir : null);
                this.current_temp = null;
                this.wind_speed = 0;
                this.wind_dir = null;
                this.tabMeteo.push(day);
                compteur++;
            }
        }
        return this.tabMeteo;
    }
}
