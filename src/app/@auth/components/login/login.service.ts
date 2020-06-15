
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../../../@common/common.http.service';
import { Observable } from 'rxjs';
import { REGISTRY } from '../../../../environments/environment';

@Injectable()
export class LoginService extends CommonHttpService {

  constructor(private http: HttpClient) {
    super(http);
  }

  public loginUser(user: any): Observable<any> {
    return this.postJson(REGISTRY.LOGIN.LOGINUSER + '?language=' + user.language, user);
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

    //test local only
    // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDAwMCIsInRlbmFudCI6IjEwMDAiLCJ1c2VySWQiOiJURVNUX1VTRVIiLCJmdWxsTmFtZSI6Iu2FjOyKpO2KuOycoOyggCIsInBhZ2VSb2xlIjp7InVwZEZsZyI6IiIsImluZkZsZyI6IiIsImRlbEZsZyI6IiJ9LCJwcm9ncmFtaWQiOiIiLCJsYW5ndWFnZSI6ImtvLUtSIiwiaWF0IjoxNTkwMTQ4MzU5LCJleHAiOjE1OTAxNTE5NTl9.PMU8KEBSrLap9nicBan9eYeld5mNqhO54pi7prTpKac';
    // localStorage.setItem('access', token);
    // localStorage.setItem('refresh', token);

    localStorage.setItem('access', token["access_token"]);
    localStorage.setItem('refresh', token["refresh_token"]);
  }

}
