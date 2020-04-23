/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const _DASHBOARDMENU: any[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/adminPages/dashboard',
    home: true,
    children: undefined,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/adminPages/iot-dashboard',
    children: undefined,
  },
];

const _ADMINMENUPAGESURL: string = '/auth/ADMINMENU';

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../@common/common-http.service';

@Injectable()
export class AdminPagesMenu extends CommonHttpService {

  private adminMenu: any[];
  constructor(private http: HttpClient) {
    super(http);
  }

  getMenu(): Observable<any> {
    return this.getJson(_ADMINMENUPAGESURL);
  }

}
