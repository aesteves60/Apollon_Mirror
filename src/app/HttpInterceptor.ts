import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../environments/config';


@Injectable ()
export class HttpAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url[0] === '/') {
      //Add BASE_URL du fichier de conf
      req = req.clone ({
        url: Config.BASE_URL + req.url
      });

      let headers = new HttpHeaders ();
      headers = headers.append ('Authorization', 'Basic ' + Config.API_KEY);
      //add param api_key qui viens du fichier de conf
      const authReq = req.clone ({ headers: headers });

      return next.handle (authReq);
    } else return next.handle (req);

  }
}
