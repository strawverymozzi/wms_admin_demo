/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const _ADMINMENUPAGESURL: string = '/menu/ADMINMENU';
// const _ADMINMENUPAGESURL: string = "/v1/mdm/menu";

import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient } from '@angular/common/http';
import { setNewProgram } from '../@global/program.administrator';

@Injectable()
export class AdminPagesMenu extends CommonHttpService {

  private NBMenuList = [];

  public getMenu() {
    return this.NBMenuList;
  }
  constructor(private http: HttpClient) {
    super(http);
  }

  initMenu() {
    this.getJson(_ADMINMENUPAGESURL).subscribe(res => {
      this.parseMenu(this.NBMenuList, res["list"]);
      
    })
  }

  parseMenu(returnedList: any[], insertedList: any[]) {
    for (let menuObj of insertedList) {
      if (menuObj["link"]) {
        setNewProgram(menuObj["link"],
          {
            url: menuObj["url"],
            dictionary: null,
            windowName: menuObj["windowName"],
            insFlg: menuObj["insFlg"],
            updFlg: menuObj["updFlg"],
            delFlg: menuObj["delFlg"]
          })
      }

      const setting = {
        title: menuObj["title"],
        icon: menuObj["icon"],
        link: menuObj["link"],
      }

      if (Array.isArray(menuObj["children"]) && menuObj["children"].length) {
        if (menuObj["children"]["link"]) {
          setNewProgram(menuObj["children"]["link"],
            {
              url: menuObj["children"]["url"],
              dictionary: null,
              windowName: menuObj["children"]["windowName"],
              insFlg: menuObj["children"]["insFlg"],
              updFlg: menuObj["children"]["updFlg"],
              delFlg: menuObj["children"]["delFlg"]
            })
        }
        setting["children"] = [];
        this.parseMenu(setting["children"], menuObj["children"]);
      }
      returnedList.push(setting);
    }
  }

}
