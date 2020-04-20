import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { NbMenuModule } from '@nebular/theme';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { AuthModule } from '../@auth/auth.module';
import { AdminPagesMenu } from './admin-pages-menu';
import { AdminPagesComponent } from './admin-pages.component';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';


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
    AuthModule.forRoot(),
  ],
  declarations: [
    ...ADMIN_PAGES_COMPONENTS,
  ],
  providers: [
    AdminPagesMenu,
  ],
})
export class AdminPagesModule { }
