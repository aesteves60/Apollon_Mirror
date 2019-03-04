
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Module } from './module';

const serialNumber = environment.serialNumber;

@Injectable()
export class ModuleService {

    constructor(private http: HttpClient) { }

    getModules(): Observable<Module[]> {
        return this.http.get<Module[]>('/modules').pipe(map((res) => res));
    }

    getViews(): Observable<any> {
        return this.http.get(`/mirror/views/${serialNumber}`).pipe(map(res => res));
    }

    changePosition(views_position, moduleId): Observable<string> {
        const options = {
            params: { 'views_position': views_position }
        };
        return this.http.put(`/positions/${serialNumber}/${moduleId}`, options).pipe(map(() => views_position));
    }

    remoteElement(_views_position): Observable<any> {
        const options = {
            params: { 'views_position': _views_position }
        };
        return this.http.delete(`/positions/${serialNumber}`, options).pipe(map((res) => res));
    }
}
