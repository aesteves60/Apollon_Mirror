import {Injectable}                                           from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable}                                           from "rxjs/Observable";
import { BASE_URL , API_KEY }                                 from '../assets/config';


@Injectable()
export class HttpAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url[0] === "/" ) {
      //Add BASE_URL du fichier de conf
      req = req.clone({
        url: BASE_URL + req.url
      });

      //add param api_key qui viens du fichier de conf
      const authReq = req.clone({ params: req.params.set('api_key', API_KEY) });

      return next.handle(authReq);
    } else return next.handle(req);

  }
}
