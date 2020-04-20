/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */


const _MENU: any[] = [
  {
    title: "Admin_module1",
    icon: "layout-outline",
    children: [
      {
        title: "AdminTestComp",
        link: "/adminPages/adminModule1/test1"
      }
    ]
  },
  {
    title: "Admin_module2",
    icon: "edit-2-outline",
    children: [
      {
        title: "AdminTestComp2",
        link: "/adminPages/adminModule2/test2"
      }
    ]
  }
];
// "ADMINMENUPAGES": [
//   {
//     "title": "Admin_module1",
//     "icon": "layout-outline",
//     "children": [
//       {
//         "title": "AdminTestComp",
//         "link": "/adminPages/adminModule1/test1"
//       }
//     ]
//   },
//   {
//     "title": "Admin_module2",
//     "icon": "edit-2-outline",
//     "children": [
//       {
//         "title": "AdminTestComp2",
//         "link": "/adminPages/adminModule1/test2"
//       }
//     ]
//   }
// ],
const _ADMINMENUPAGESURL: string = '/ADMINMENUPAGES';

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
    return of([..._MENU]);
  }
  
}
