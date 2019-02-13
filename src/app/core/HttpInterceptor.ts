import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class HttpAPIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url[0] === '/') {
            // Add BASE_URL du fichier de conf
            req = req.clone({ url: environment.baseUrl + req.url });

            let headers = new HttpHeaders();
            headers = headers.append('Authorization', 'Basic ' + environment.apiKey);
            // add param api_key qui viens du fichier de conf
            const authReq = req.clone({ headers: headers });

            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
