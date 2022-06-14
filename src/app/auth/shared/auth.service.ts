import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { map, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://51.38.51.187:5050/api/v1/auth/sign-up',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.httpClient
      .post<LoginResponse>(
        'http://51.38.51.187:5050/api/v1/auth/log-in',
        loginRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.store('accessToken', data.accessToken);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('tokenType', data.tokenType);
          return true;
        })
      );
  }

  logout() {
    this.localStorage.clear();
  }

  getJwtToken() {
    return this.localStorage.retrieve('accessToken');
  }
}
