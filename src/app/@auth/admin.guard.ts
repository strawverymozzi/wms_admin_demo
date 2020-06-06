/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NbRoleProvider } from '@nebular/security';
import { ROLES } from './roles';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProgramHelper, NBMenuList } from '../@program/program-helper';

const _ADMINMENUPAGESURL: string = '/menu/ADMINMENU';

@Injectable()
export class AdminGuard extends CommonHttpService implements CanActivate {
  constructor(
    private roleProvider: NbRoleProvider,
    private router: Router,
    private http: HttpClient
  ) {
    super(http);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("ADMIN GUARD TRIED");
    return this.getJson(_ADMINMENUPAGESURL).pipe(map(res => {
      ProgramHelper.parseProgram(NBMenuList, res["list"]);
      return true;
    }), catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
      }
      console.log("AdminGuard API CALL resolve ERR: " + error.status)
      this.router.navigate(['auth/login']);

      return [];
    }));
  }

  // if (!this.checkToken()) {
  //   this.router.navigate(['auth/login']);
  //   return false;
  // }

  // pipe(map(role => {
  //   const roles = role instanceof Array ? role : [role];

  //   return roles.some(x => {
  //     if (!(x && x.toLowerCase() !== ROLES.ADMIN)) {
  //       this.router.navigate(['auth/login']);
  //       return false;
  //     }
  //     return true;
  //   });
  // }));


}
