import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminPagesInterceptor } from './admin-pages.interceptor';
import { AuthModule } from '../@auth/auth.module';

const ADMIN_PAGES_COMPONENTS = [
  AdminPagesComponent,
];

@NgModule({
  imports: [
    AdminPagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    AuthModule.forRoot()
  ],
  declarations: [
    ...ADMIN_PAGES_COMPONENTS,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminPagesInterceptor, multi: true },
  ]
})
export class AdminPagesModule {
  constructor() {

  }

}
