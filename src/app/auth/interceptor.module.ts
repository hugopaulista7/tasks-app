import { Injectable, NgModule } from '@angular/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpHeaders,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { switchMap, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LoginService } from '../services/user/login.service';

@Injectable()

export class HttpsRequestInterceptor  implements HttpInterceptor {

  private apiUrl = '';
  constructor(
    private login: LoginService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  private async authenticationHeader(headers: HttpHeaders): Promise<any> {
    const token: string = await this.login.getUserApi();
    // if (token) {
    // }
    headers = headers.set('Authorization', 'Bearer ' + environment.apiToken);
    headers = headers.set('Content-Type', 'application/json');

    return headers;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const options: any = {
      url: this.apiUrl + req.url
    };
    const headers: HttpHeaders = new HttpHeaders();

    return from(this.authenticationHeader(headers))
      .pipe(
        // tslint:disable-next-line: no-shadowed-variable
        switchMap((headers: HttpHeaders) => {
          options.headers = headers;
          return next.handle(req.clone(options));
        })
      );
  }

}


@NgModule({
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})

export class Interceptor {}
