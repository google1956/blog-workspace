import { Injectable } from '@angular/core';
// import { Account } from '../../models/account.model';
import { CookieService } from 'ngx-cookie-service';

const AUTH_KEY = 'auth'
const ACCOUNT_INFO_KEY = 'accountInfo'

export const IS_CHECKOUT = 'isCheckout'
export const ORDERS = 'orders'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  account?: any | null //ACOUNT MODEL
  private accountExpiredTime = 15 //DAYS
  constructor(
    private readonly cookieService: CookieService
  ) { }

  logout() {
    this.removeAll()
    this.account = null
  }

  setAuthentical(data: any) {
    this.cookieService.set(AUTH_KEY, JSON.stringify(data), {  path: '/', expires: this.accountExpiredTime });
    this.cookieService.set(AUTH_KEY, JSON.stringify(data), { expires: this.accountExpiredTime });
  }

  getAuthentical() {
    let authInfo: any = this.cookieService.get(AUTH_KEY)
    if (authInfo == null) {
      authInfo = localStorage.getItem(AUTH_KEY)
    }

    if (authInfo != null && authInfo != "") {
      this.account = JSON.parse(authInfo)
      return this.account
    }
    return null
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getLocalStorage(key: string) {
    var value = localStorage.getItem(key)
    if (value) return JSON.parse(value)
    return null
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key)
  }

  removeAll() {
    this.cookieService.deleteAll()
    this.cookieService.deleteAll('/')
    // this.cookieService.deleteAll('/', '.sieuve.com')
  }

  checkAuthBeforeCheckout(orders: any[]) {
    let oauth = this.getAuthentical()
    if (!oauth) {
      this.cookieService.set(ORDERS, JSON.stringify(orders))
      this.cookieService.set(IS_CHECKOUT, 'true')
      return true
    }
    return false
  }

  setAccountInfo(accountInfo: any) {
    localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(accountInfo))
  }

  isLogin(): boolean {
    let accountString = this.cookieService.get(AUTH_KEY)
    if (accountString) {
      this.account = JSON.parse(accountString)
      return true
    }
    return false
  }
}
