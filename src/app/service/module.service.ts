import {Injectable}    from '@angular/core';
import {HttpClient}    from '@angular/common/http';
import {SERIAL_NUMBER} from '../../assets/config';
import { Observable }  from "rxjs/Observable";


export interface Modules {
  id: number,
  name: string,
  image: string,
  camConfigure: number
}

@Injectable()
export class ModuleService {

  constructor(private http: HttpClient){}

  getModules(): Observable<Modules[]> {
    return this.http.get<Modules[]>('/API/get_modules').map((res) => res);
  }

  getViews(): Observable<any> {
    const options = {
      params: {
        'serial_number': SERIAL_NUMBER
      }
    };
    return this.http.get('/API/get_views_mirror', options).map(res => res)
  }

  ChangePosition(_views_position, _moduleId): Observable<string>{
    const options = {
      params: {
        'views_position': _views_position,
        'serial_number': SERIAL_NUMBER,
        'module_id': _moduleId
      }
    };
    return this.http.get('/API/change_position', options).map(() => _views_position);
  }

  RemoteElement(_views_position): Observable<any>{
    const options = {
      params: {
        'views_position': _views_position,
        'serial_number': SERIAL_NUMBER
      }
    };
    return this.http.delete('/API/remove_position', options).map((res) => res );
  }
}
