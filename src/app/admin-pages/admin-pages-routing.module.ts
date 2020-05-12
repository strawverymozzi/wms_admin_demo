/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Router, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { ECommerceComponent } from '../pages/e-commerce/e-commerce.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AdminPagesComponent } from './admin-pages.component';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../@common/common-http.service';
import { AdminPagesMenu } from './admin-pages-menu';

const _ADMINMODULEURL: string = '/auth/ADMINMODULE';

const routes: Routes = [{
  path: '',
  component: AdminPagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'AdminModule1Module',
      loadChildren: () => import('./admin-module1/admin-module1.module')
        .then(m => m.AdminModule1Module),
    },
    {
      path: 'AdminModule2Module',
      loadChildren: () => import('./admin-module2/admin-module2.module')
        .then(m => m.AdminModule2Module),
    },
    {
      path: 'devextreme',
      loadChildren: () => import('../pages/devextreme/devextreme.module')
        .then(m => m.DevextremeModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule extends CommonHttpService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private menuService: AdminPagesMenu
  ) {
    super(http);

  }
}
