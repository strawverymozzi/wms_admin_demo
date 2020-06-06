/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { checkToken } from '../@auth/auth.module';
import { tokenAppendProgramMeta } from '../@program/program-helper';

// const ['/auth/login', '/auth/sign-up', '/auth/request-pass', '/auth/refresh-token']
//     .some(url => req.url.includes(url));
@Injectable()
export class AdminPagesInterceptor implements HttpInterceptor {
  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("admin interceptor", req.url)

    let clonedReq = req;
    if (checkToken()) {

      const authJWT = tokenAppendProgramMeta(localStorage.getItem('access'));
      const refreshJWT = tokenAppendProgramMeta(localStorage.getItem('access'));
      
      clonedReq = req.clone({
        headers: req.headers
          .append('authorization', 'Bearer ' + authJWT)
          .append('refreshtoken', refreshJWT),
        withCredentials: true,
        responseType: 'json'
      });
    }

    return next.handle(clonedReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
        },
        () => {
        })
    );

  }
}
