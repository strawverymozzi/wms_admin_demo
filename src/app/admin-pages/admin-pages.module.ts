import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { NbMenuModule } from '@nebular/theme';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { AdminPagesMenu } from './admin-pages-menu';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminPagesInterceptor } from './admin-pages.interceptor';
import { AdminGuard } from '../@auth/admin.guard';
import { PipesModule } from '../@pipes/pipes.module';

const GUARDS = [AdminGuard];

const ADMIN_PAGES_COMPONENTS = [
  AdminPagesComponent,
];

@NgModule({
  imports: [
    AdminPagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    NbMenuModule,
    MiscellaneousModule,
    
  ],
  declarations: [
    ...ADMIN_PAGES_COMPONENTS,
  ],
  providers: [
    AdminPagesMenu,

    { provide: HTTP_INTERCEPTORS, useClass: AdminPagesInterceptor, multi: true },
    ...GUARDS,]

})
export class AdminPagesModule {
  constructor() {

  }
}
