import { Injectable } from '@angular/core';
import {Config} from "../../assets/config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TraficService {

  constructor(private http: HttpClient) { }

  getTrafic() {
    const options = {
      params: {
        'serial_number': Config.SERIAL_NUMBER
      }
    };
    return this.http.get('/API/trafic', options)
  }

  getConfig() {
    const options = {
      params: {
        'serial_number': Config.SERIAL_NUMBER,
        'module': 'Trafic routier'
      }
    };
    return this.http.get('/API/get_config', options)
  }
}
