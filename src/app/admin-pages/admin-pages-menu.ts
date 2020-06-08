/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

// const _ADMINMENUPAGESURL: string = "/v1/mdm/menu";

import { Injectable } from '@angular/core';
import { CommonHttpService } from '../@common/common-http.service';
import { HttpClient } from '@angular/common/http';
import { NBMenuList, getProgramMap } from '../@program/program-helper';

@Injectable()
export class AdminPagesMenu extends CommonHttpService {

  public getMenu() {
    console.log(getProgramMap())
    return NBMenuList;
  }
  constructor(private http: HttpClient) {
    super(http);
  }

}
