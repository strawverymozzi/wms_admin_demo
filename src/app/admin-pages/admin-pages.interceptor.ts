/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProgramHelper, isRegistered } from '../@program/program-helper';
import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class AdminPagesInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq = req;
    const currentView = this.router.routerState.snapshot.url;

    if (!!localStorage.getItem("access") && !!localStorage.getItem("refresh") && isRegistered(currentView, req.url)) {

      // const accessJWT = ProgramHelper.tokenAppendProgramMeta(localStorage.getItem('access'), currentView);
      // const refreshJWT = ProgramHelper.tokenAppendProgramMeta(localStorage.getItem('access'), currentView);
      const accessJWT = localStorage.getItem('access');
      const refreshJWT = localStorage.getItem('access');

      clonedReq = req.clone({
        headers: req.headers
          .append('authorization', 'Bearer ' + accessJWT)
          .append('refreshtoken', refreshJWT),
        withCredentials: true,
        responseType: 'json'
      });
    }

    return next.handle(clonedReq).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //   this.router.navigate(['auth/login']);
        // }
        // TODO: handle 403 error ?
        return throwError(error);
      }));

  }
}
