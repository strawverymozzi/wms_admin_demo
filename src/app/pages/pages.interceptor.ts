/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NbTokenLocalStorage } from '@nebular/auth';

@Injectable()
export class PagesInterceptor implements HttpInterceptor {

  constructor(private router: Router, private tokenStorage: NbTokenLocalStorage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq = req;
    if (req.method == 'POST') {
      clonedReq = req.clone({
        headers: req.headers
        .append('authorization', 'Bearer ' + localStorage.getItem('access'))
        .append('refreshtoken', localStorage.getItem('refresh')),
        body: { version: 'v1', user: "jbh5310", data: req.body }
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
