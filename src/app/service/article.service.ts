import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {

    constructor(private http: HttpClient) {
    }

    getArticleActu(): Observable<any> {
        return this.http.get('/apipollon/actu').pipe(
            map(res => {
                return res['articles'].map(obj => {
                    obj.isShow = false;
                    return obj;
                });
            })
        );
    }

    getArticleEquipe(): Observable<any> {
        return this.http.get('/apipollon/equipe').pipe(
            map(res => {
            return res['articles'].map(obj => {
                obj.isShow = false;
                return obj;
            });
        })
        )
    }

}
