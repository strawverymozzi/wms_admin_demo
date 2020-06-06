import { NgModule, ModuleWithProviders } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { NbMenuModule } from '@nebular/theme';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { AdminPagesMenu } from './admin-pages-menu';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminPagesInterceptor } from './admin-pages.interceptor';
import { AdminGuard } from '../@auth/admin.guard';
import { PipesModule } from '../@pipes/pipes.module';
import { AuthModule } from '../@auth/auth.module';


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
