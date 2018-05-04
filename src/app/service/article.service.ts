import {Injectable}   from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArticleService {

  public articles;

  constructor(private http : HttpClient){ }

  getArticleActu(): Observable<any> {
    return this.http.get('/API/actualite').map(res => {
      return res['articles'].map(obj => {
        obj.isShow = false;
        return obj;
      });
    });
  }

  getArticleEquipe(): Observable<any> {
    return this.http.get('/API/lequipe')
        .map(res => {
          this.articles = res['articles'];
          return this.articles.map(obj => obj.isShow = false);
        });
  }

}
