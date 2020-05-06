/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

//const _ADMINMENUPAGESURL: string = 'http://localhost:3001/api/auth/ADMINMENU';
const _ADMINMENUPAGESURL: string = "https://www.jflab.co.kr:18000/api/v1/mdm/menu";

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../@common/common-http.service';

@Injectable()
export class AdminPagesMenu extends CommonHttpService {

  private adminMenu: any[];
  constructor(private http: HttpClient) {
    super(http);
    this.adminMenu = [];
  }

  callMenu(): Observable<any> {
    return this.getJson(_ADMINMENUPAGESURL);
  }

  setMenu() {
    return this.http.get(_ADMINMENUPAGESURL).subscribe(
      res => {
        this.adminMenu.push(...res["list"]);
      }
    )
    // this.callMenu().subscribe(res => {
    //   this.adminMenu.push(...res["list"]);
    // })
  }

  getMenu(): any[] {
    return this.adminMenu;
  }

}
