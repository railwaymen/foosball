/* tslint:disable:no-any */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ENV } from '@app/env';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  public constructor(public auth: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: 'Token token=' + this.auth.getToken() + ', client_id=' + ENV.API_CLIENT_ID
      }
    });

    return next.handle(request);
  }
}
