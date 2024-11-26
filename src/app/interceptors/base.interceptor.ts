import { Inject, Injectable, Optional } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject('API_URL') private API_URL: string
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.setBaseUrl(request));
  }

  private setBaseUrl(request: HttpRequest<unknown>): HttpRequest<any> {
    return request.clone({
      url: `${this.API_URL}${request.url}`//`${environment.apiUrl}${request.url}`
    })
  }

}
