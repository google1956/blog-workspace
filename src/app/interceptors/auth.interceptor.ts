import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, of, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { AppService } from '../services/app.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private readonly appService: AppService
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(this.handleJwt(request))
      .pipe(catchError((x) => this.handleAuthError(x)))
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      this.appService.logout()
      if (!this.router.routerState.snapshot.url.startsWith('/visualization')) {
        this.router.navigate(['/login'], {
          queryParams: {
            return_url: this.router.routerState.snapshot.url,
          },
        })
      }
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message) // or EMPTY may be appropriate here
    }
    return throwError(() => err)
  }

  private handleJwt(request: HttpRequest<unknown>): HttpRequest<any> {
    // let oauth = this.appService.getAuthentical()
    let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNjczZDY4MGRhMDI2NjhiMGQ4MmE2NmZhIiwidXNlcm5hbWUiOiJpd29tMzUyMCIsImV4cGlyZWQiOjE3MzIyNTAzODE4MDcsImlhdCI6MTczMjA3NzU4MX0.ZjxrP1IFLhmXhOEmEAcICnNGFrosj73_TUxJTrb1OPM' //oauth?.accessToken
    request.headers.set('Content-Type', 'application/json');
    if (access_token) {
      request.headers.set('Authorization', `Bearer ${access_token}`)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    }
    return request
  }
}

