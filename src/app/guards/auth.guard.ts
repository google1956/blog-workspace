import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AppService } from '../services/app.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    var authrized = this.appService.isLogin()
    if (!authrized) {
      this.router.navigate(['/login'], { queryParamsHandling: 'merge' })
    }
    return authrized
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    var authrized = this.appService.isLogin()
    if (!authrized) {
      this.router.navigate(['/login'], {
        queryParamsHandling: 'merge',
        queryParams: {
          return_url: state.url,
        },
      })
    }
    return authrized
  }
}
