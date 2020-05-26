
const _LOGINURL = '/auth/loginUser';

import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../../../@common/common-http.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService extends CommonHttpService {

  constructor(private http: HttpClient) {
    super(http);

  }
  public loginUser(user: any): Observable<any> {
    return this.postJson(_LOGINURL, user);
  }
  public handleLoginResult(loginResult: any): boolean {
    if (loginResult) {
      const token = loginResult['token'];
      this.setToken(token);
      return true;
    }
    return false;
  }
  private setToken(token) {
    localStorage.setItem('access', token["access_token"]);
    localStorage.setItem('refresh', token["refresh_token"]);
  }
}
