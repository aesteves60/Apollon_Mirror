import { Injectable } from '@angular/core';
import {Config} from "../../environments/config";
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
    return this.http.get('/apipollon/trafic', options)
  }

  getConfig() {
    return this.http.get(`/apipollon/modules/${Config.SERIAL_NUMBER}/Trafic routier`)
  }
}
