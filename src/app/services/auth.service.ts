import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Injectable({
    providedIn: 'root',
})
export class AccountApi {
    constructor(
        private http: HttpClient,
        private readonly appService: AppService
    ) {

    }

    login(loginRequest: any) {
        return this.http.post('/account/login', loginRequest)
    }

    logout() {

    }

    resgiter(data: any, type: string): Observable<any> {
        var params = {
            web_type: type,
        }
        return this.http.post('/account/register', data, { params: params })
    }

    emailValidate(emailToken: string): Observable<any> {
        return this.http.get(`/account/email_validate/${emailToken}`)
    }

    createAccountContactInfo(data: any): Observable<any> {
        return this.http.post('/account-info/create', data)
    }

    getAccount(): Observable<any> {
        return this.http.get('/account')
    }

    updateEmail(data: any): Observable<any> {
        return this.http.post('/account/changeEmail', data)
    }

    getAccountContactInfo(): Observable<any> {
        return this.http.get('/account-info')
    }

    updateAccountContactInfo(data: any): Observable<any> {
        return this.http.post('/account-info/update', data)
    }

    changeOldPassword(data: any): Observable<any> {
        return this.http.post('/account/password/change', data)
    }

    resetPasswordRequest(email: string, type: string): Observable<any> {
        var params = {
            web_type: type,
        }
        return this.http.get(`/account/password/reset/${email}`, { params })
    }

    resetPassword(data: { new_password: string, resetPasswordToken: string }): Observable<any> {
        return this.http.post(`/account/password/reset`, data)
    }
}
