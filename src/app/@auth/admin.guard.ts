/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';
import { CommonHttpService } from '../@common/common.http.service';
import { HttpClient, HttpErrorResponse, HttpEvent, } from '@angular/common/http';
import { parseProgramList, setAdminLeft } from '../@program/program.registry';
import { REGISTRY } from '../../environments/environment';
import { error } from 'protractor';

@Injectable()
export class AdminGuard extends CommonHttpService implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<boolean> | boolean {
    if (!!localStorage.getItem("access") && !!localStorage.getItem("refresh")) {
      console.warn("admin guard")

      return this.http.get(REGISTRY.ADMINMENU.INIT).pipe(
        map(res => {
          let menu = [];
          parseProgramList(menu, res["list"]);
          setAdminLeft(menu);
          return true;
        })
      )
    } else {
      console.warn("BLOCKED : [ADMIN GUARD]");
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
