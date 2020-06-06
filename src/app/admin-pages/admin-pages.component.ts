/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbTokenService, urlBase64Decode } from '@nebular/auth';
import { InitUserService } from '../@theme/services/init-user.service';
import { AdminPagesMenu } from './admin-pages-menu';
import { Router, NavigationStart } from '@angular/router';
import { getProgramMap } from '../@program/program-helper';

@Component({
  selector: 'ngx-admin-pages',
  styleUrls: ['admin-pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  providers: [AdminPagesMenu]
})
export class AdminPagesComponent implements OnDestroy {

  menu: any[] = [];
  alive: boolean = true;

  constructor(
    private menuService: AdminPagesMenu,
  ) {
    this.menu = this.menuService.getMenu();
  }



  ngOnDestroy(): void {
    this.alive = false;
  }
}
