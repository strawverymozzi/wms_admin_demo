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

const _ADMINPAGEMAPPER = {
  components: {
    "entryComponent": AdminPagesComponent
  },
  staticModuleRoute: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
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
  ]
}

export function setModulePath(data: any): Routes[] {

  const children = [];
  for (let config of data.modules) {
    const importPath = config.importPath;
    children.push(
      {
        path: config.module,
        loadChildren: () => {
          return import('' + importPath).then(m => m[config.module]);
        }
      }
    )
  }
  return children;
}

@NgModule({
  exports: [RouterModule],
  providers: [AdminPagesMenu]
})
export class AdminPagesRoutingModule extends CommonHttpService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private menuService: AdminPagesMenu
  ) {
    super(http);
    this.getJson(_ADMINMODULEURL).subscribe(res => {
      const modulePathConfig = {
        path: '',
        component: _ADMINPAGEMAPPER.components.entryComponent,
        children: [...setModulePath(res), ..._ADMINPAGEMAPPER.staticModuleRoute]
      };
      this.router.config.forEach((v, i, a) => {
        let loadedConfig: any = v;
        if (loadedConfig.path == 'adminPages') {
          loadedConfig._loadedConfig.routes.push(
            modulePathConfig
          );
          return;
        }
      });
      menuService.setMenu();
      router.navigateByUrl("/adminPages/dashboard");
    })
  }
}
