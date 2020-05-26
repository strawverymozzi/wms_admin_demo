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

@Injectable()
export class AdminPagesInterceptor implements HttpInterceptor {
  private options: any;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private router: Router) {
    this.headers = this.headers.append('authorization', 'Bearer ' + localStorage.getItem('access'));
    this.headers = this.headers.append('refreshtoken', localStorage.getItem('refresh'));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("admin interceptor")
    let clonedReq = req;
    clonedReq = req.clone({
      headers: this.headers,
    });

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
