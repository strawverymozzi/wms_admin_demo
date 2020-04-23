/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbTokenService } from '@nebular/auth';
import { InitUserService } from '../@theme/services/init-user.service';
import { AdminPagesMenu } from './admin-pages-menu';

@Component({
  selector: 'ngx-admin-pages',
  styleUrls: ['admin-pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AdminPagesComponent implements OnDestroy {

  menu: any[] = [];
  alive: boolean = true;

  constructor(
    private adminPagesMenu: AdminPagesMenu,
    private tokenService: NbTokenService,
    protected initUserService: InitUserService,
  ) {
    this.initMenu();
    console.log("AdminPagesComponent");
    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
  }

  initMenu() {
    this.adminPagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = [...menu];
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
