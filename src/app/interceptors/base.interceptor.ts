import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(setBaseUrl(request));
  }
}

function setBaseUrl(request: HttpRequest<unknown>): HttpRequest<any> {
  return request.clone({
    url: `http://localhost:3000${request.url}`//`${environment.apiUrl}${request.url}`
  })
}

