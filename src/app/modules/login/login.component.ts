import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  returnUrl?: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['return_url']
    })

    if (this.appService.isLogin()) {
      this.handleReturnUrl()
      return
    }
  }

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });

  isLoadingSubmit = false
  submitForm(): void {
    if (this.validateForm.valid) {
      let username = this.validateForm.value.username || ''
      let password = this.validateForm.value.password || ''

      this.isLoadingSubmit = true
      this.authService.login({ username, password }).subscribe({
        next: (res: any) => {
          if (res.data) {
            let accessToken = res.data.access_token
            let account: any = res.data.account
            account.accessToken = accessToken
            this.appService.setAuthentical(account)
            this.appService.setAccountInfo(account)
          }
        }, complete: () => {
          this.handleReturnUrl()
          this.isLoadingSubmit = false
        }, error: (err: any) => {
          // this.utilService.showErrorMessage("Vui lòng kiểm tra lại thông tin tài khoản")
          this.isLoadingSubmit = false
        }
      })

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleReturnUrl() {
    if (this.returnUrl) {
      let urlArray = this.returnUrl.split('?')
      let newParamsArray
      if (urlArray[1]) {
        newParamsArray = this.parseQueryString(urlArray[1])
      }
      this.router.navigate([urlArray[0]], { queryParams: newParamsArray })
    } else {
      this.router.navigate(['/'])
    }
  }

  parseQueryString(queryString: string): { [key: string]: string } {
    // Split the query string by '&' to get key-value pairs
    const pairs = queryString.split('&');

    // Initialize an empty object to store the parsed key-value pairs
    const result: { [key: string]: string } = {};

    // Loop through each pair
    pairs.forEach(pair => {
      // Split each pair by '=' to separate key and value
      const [key, value] = pair.split('=', 2);
      // Store the key-value pair in the object
      result[key] = decodeURIComponent(value);
    });
    return result;
  }
}
