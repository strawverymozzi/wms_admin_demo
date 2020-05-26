/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const _ADMINMENUPAGESURL: string = '/menu/ADMINMENU';
// const _ADMINMENUPAGESURL: string = "/v1/mdm/menu";

import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { ProgramInitHelper } from '../@common/ProgramInitHelper';

@Injectable()
export class AdminPagesMenu extends CommonHttpService {

  private NBMenuList = [];

  public getMenu() {
    return this.NBMenuList;
  }
  constructor(
    private http: HttpClient,
    private programHelper: ProgramInitHelper
  ) {
    super(http);
  }

  initMenu() {
    this.getJson(_ADMINMENUPAGESURL).subscribe(res => {
      this.parseMenu(this.NBMenuList, res["list"]);
    })
  }

  parseMenu(returnedList: any[], insertedList: any[]) {
    for (let menuObj of insertedList) {
      const setting = {
        title: menuObj["title"],
        icon: menuObj["icon"],
        link: menuObj["link"],
      }
      if (
        Array.isArray(menuObj["children"]) && menuObj["children"].length
      ) {
        setting["children"] = [];
        this.parseMenu(setting["children"], menuObj["children"]);
      }
      returnedList.push(setting);
    }
  }

  parseProgram(returnedObj: any, insertedList: any[]) {

  }


}
