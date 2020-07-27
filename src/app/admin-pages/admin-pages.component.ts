/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { getAdminLeft } from '../@program/program.registry';

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

  constructor() {
    this.menu = getAdminLeft();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
