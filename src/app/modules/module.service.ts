
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const serialNumber = environment.serialNumber;

export interface Modules {
    id: number;
    name: string;
    image: string;
    camConfigure: number;
}

@Injectable()
export class ModuleService {

    constructor(private http: HttpClient) { }

    getModules(): Observable<Modules[]> {
        return this.http.get<Modules[]>('/modules').pipe(map((res) => res));
    }

    getViews(): Observable<any> {
        return this.http.get(`/mirror/views/${serialNumber}`).pipe(map(res => res));
    }

    ChangePosition(_views_position, _moduleId): Observable<string> {
        const options = {
            params: { 'views_position': _views_position }
        };
        return this.http.put(`/positions/${serialNumber}/${_moduleId}`, options).pipe(map(() => _views_position));
    }

    RemoteElement(_views_position): Observable<any> {
        const options = {
            params: { 'views_position': _views_position }
        };
        return this.http.delete(`/positions/${serialNumber}`, options).pipe(map((res) => res));
    }
}
