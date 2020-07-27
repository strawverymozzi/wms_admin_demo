/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clonedReq = req;
    if (!!localStorage.getItem("access") && !!localStorage.getItem("refresh")) {
      clonedReq = req.clone({
        headers: req.headers
          .append('Accept', '*; charset=utf-8')
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/json')
          .append('authorization', 'Bearer ' + localStorage.getItem('access'))
          .append('refreshtoken', localStorage.getItem('refresh'))
          .append('Access-Control-Allow-Headers', '*')
          .append('Access-Control-Expose-Headers', '*'),
        //withCredentials: true,
        responseType: 'json'
      });
    }

    return next.handle(clonedReq)
      .pipe(
        retry(2),
        map(res => {
          return res;
        }),
        catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
          console.log("Auth INTER")
          notify({ message: error.message, width: 500, position: 'top' }, 'error', 3000);
          this.router.navigate(['auth/login'], { skipLocationChange: false });
          return EMPTY;
        })
      )

  }
}
