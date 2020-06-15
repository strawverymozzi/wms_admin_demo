/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ExtraOptions, RouterModule, Routes, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth.guard';
import { AdminGuard } from './@auth/admin.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [],
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule).then(),
  },
  {
    path: 'adminPages',
    canActivate: [AdminGuard],
    loadChildren: () => import('../app/admin-pages/admin-pages.module')
      .then(m => m.AdminPagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/@auth/auth.module')
      .then(m => m.AuthModule)
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
