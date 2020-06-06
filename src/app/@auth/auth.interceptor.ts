/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { checkToken } from './auth.module';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("auth interceptor", req.url)
    let clonedReq = req;

    if (checkToken()) {
      clonedReq = req.clone({
        headers: req.headers
          .append('Accept', '*; charset=utf-8')
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/json')
          .append('authorization', 'Bearer ' + localStorage.getItem('access'))
          .append('refreshtoken', localStorage.getItem('refresh')),
        withCredentials: true,
        responseType: 'json'
      });
    }


    return next.handle(clonedReq)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['auth/login']);
        }
        // TODO: handle 403 error ?
        return throwError(error);
      }));
  }
}
