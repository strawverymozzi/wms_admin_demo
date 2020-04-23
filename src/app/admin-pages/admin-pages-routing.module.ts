/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { ECommerceComponent } from '../pages/e-commerce/e-commerce.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AdminPagesComponent } from './admin-pages.component';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../@common/common-http.service';
import { AdminModule1Module } from './admin-module1/admin-module1.module';
import { AdminModule2Module } from './admin-module2/admin-module2.module';

const _ADMINMODULEURL: string = '/auth/ADMINMODULE';

const DEFAULTPATH = [
  {
    path: '**',
    component: NotFoundComponent,
  },
  {
    path: 'dashboard',
    component: ECommerceComponent,
  },
  {
    path: 'iot-dashboard',
    component: DashboardComponent,
  }
]

const DICTIONARY = {
  components: {
    "entryComponent": AdminPagesComponent
  },
  modules: {
    "AdminModule1Module": AdminModule1Module,
    "AdminModule2Module": AdminModule2Module
  },
}

class AdminModuleService extends CommonHttpService {
  private adminModulePath: any[];
  constructor(private http: HttpClient) {
    super(http);
    this.getJson(_ADMINMODULEURL).subscribe(res => {
      this.adminModulePath = res;
    })
  }

  static getChildren(): any[] {
    // [
    //   {
    //     path: '',
    //     redirectTo: 'dashboard',
    //     pathMatch: 'full',
    //   },

    //   {
    //     path: 'AdminModule1Module',
    //     loadChildren: () => import('./admin-module1/admin-module1.module')
    //       .then(m => { return m.AdminModule1Module }),
    //   },
    //   {
    //     path: 'AdminModule2Module',
    //     loadChildren: () => import('./admin-module2/admin-module2.module')
    //       .then(m => m.AdminModule2Module),
    //   },

    // ],
    return null;
  }

  static getModulePath() {

    const routes: Routes = [{
      path: '',
      component: AdminPagesComponent,
      children: this.getChildren()
    }];
    return [...DEFAULTPATH, ...routes];
  }

}


@NgModule({
  imports: [RouterModule.forChild(AdminModuleService.getModulePath())],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {

  constructor() {
    console.log("AdminPagesRoutingModule")
  }
}
