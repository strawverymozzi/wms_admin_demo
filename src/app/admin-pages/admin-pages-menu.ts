/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const _ADMINMENUPAGESURL: string = 'http://localhost:3001/api/auth/ADMINMENU';
// const _ADMINMENUPAGESURL: string = "http://www.jflab.co.kr:18000/api/v1/mdm/menu";

import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminPagesMenu {

  private adminMenu: any[];
  private options: any;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private _http: HttpClient) {
    // super(_http);
    this.adminMenu = [];
    this.headers = this.headers.append('Accept', '*; charset=utf-8');
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('authorization', 'Bearer ' + localStorage.getItem('access'))
    this.headers = this.headers.append('refreshtoken', localStorage.getItem('refresh')),

      this.options = { headers: this.headers, responseType: 'json' };
  }

  // callMenu(): Observable<any> {
  //   return this.getJson(_ADMINMENUPAGESURL);
  // }

  setMenu() {
    return this._http.get(_ADMINMENUPAGESURL, this.options).subscribe(
      res => {
        const menuList = res["list"];
        console.log(menuList)
        this.interpretToNBMenu(menuList)
        console.log(menuList)

        this.adminMenu.push(...menuList);
      }
    )
    // this.callMenu().subscribe(res => {
    //   this.adminMenu.push(...res["list"]);
    // })
  }

  getMenu(): any[] {
    return this.adminMenu;
  }

  interpretToNBMenu(menuList: any[]) {
    for(let menuObj of menuList){
      if(!menuObj["children"].length){
        delete menuObj["children"];
      }else{
        this.interpretToNBMenu(menuObj["children"]);
      }
    }
  }

}
