import {Injectable}    from '@angular/core';
import {HttpClient}    from '@angular/common/http';
import { Config } from '../../environments/config';
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
    return this.http.get<Modules[]>('/apipollon/modules').map((res) => res);
  }

  getViews(): Observable<any> {
    return this.http.get(`/apipollon/mirror/views/${Config.SERIAL_NUMBER}`).map(res => res)
  }

  ChangePosition(_views_position, _moduleId): Observable<string>{
    const options = {
      params: { 'views_position': _views_position }
    };
    return this.http.put(`/apipollon/positions/${Config.SERIAL_NUMBER}/${_moduleId}`, options).map(() => _views_position);
  }

  RemoteElement(_views_position): Observable<any>{
    const options = {
      params: { 'views_position': _views_position }
    };
    return this.http.delete(`/apipollon/positions/${Config.SERIAL_NUMBER}`, options).map((res) => res );
  }
}
