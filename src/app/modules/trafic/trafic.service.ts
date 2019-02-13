import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const serialNumber = environment.serialNumber;

@Injectable()
export class TraficService {

    constructor(private http: HttpClient) { }

    getTrafic() {
        const options = {
            params: {
                'serial_number': serialNumber            }
        };
        return this.http.get('/trafic', options)
    }

    getConfig() {
        return this.http.get(`/modules/${serialNumber}/Trafic routier`)
    }
}
