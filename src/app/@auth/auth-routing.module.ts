/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NgxAuthComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
} from './components';
import { ProgramInitResolver } from '../@program/program.init-resolver';
import { REGISTRY } from '../../environments/environment';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
      resolve: { programInit: ProgramInitResolver },
      data: { callUponActive: REGISTRY.LOGIN.INIT },
    },
    {
      path: 'login',
      component: NgxLoginComponent,
      resolve: { programInit: ProgramInitResolver },
      data: { callUponActive: REGISTRY.LOGIN.INIT },

    },
    {
      path: 'register',
      component: NgxRegisterComponent,
    },
    {
      path: 'logout',
      component: NgxLogoutComponent,
    },
    {
      path: 'request-password',
      component: NgxRequestPasswordComponent,
    },
    {
      path: 'reset-password',
      component: NgxResetPasswordComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  constructor() {
  }
}
