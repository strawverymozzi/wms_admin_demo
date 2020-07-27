/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { isRegistered } from '../@program/program.registry';
import notify from 'devextreme/ui/notify';


@Injectable()
export class AdminPagesInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let clonedReq = req;
    const currentView = this.router.routerState.snapshot.url;
    if (!!localStorage.getItem("access") && !!localStorage.getItem("refresh") && isRegistered(currentView, req.url)) {

    }
    return next.handle(clonedReq).pipe(
      retry(2),
      map(res => {
        return res;
      }),
      catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
        console.log("ADMIN INTER")
        notify({ message: error.error ? error.error.message : error.message, width: 500, position: 'top' }, 'error', 2000);
        return EMPTY;
      })
    );

  }
}
