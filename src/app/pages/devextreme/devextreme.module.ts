import { NgModule } from '@angular/core';

import { DevextremeComponent } from './devextreme.component';
import { DevextremeRoutingModule } from './devextreme-routing.module';

import {
  DxDataGridModule,
  DxToolbarModule,
  DxAccordionModule,
  DxTabPanelModule,
  DxActionSheetModule,
  DxPopupModule,
  DxScrollViewModule,
  DxDropDownBoxModule,
  DxListModule,
  DxDateBoxModule,
} from 'devextreme-angular';
import { SampleComponent } from './sample/sample.component';
import { DemoGridComponent } from './demo-grid/demo-grid.component';
import { CommonModule } from '@angular/common';
import { MasterSearchFormComponent } from './sample/component/master-search-form/master-search-form.component';
import { MasterSearchSubFormComponent } from './sample/component/master-search-sub-form/master-search-sub-form.component';
import { DxCommonFormModule } from '../../@dx_module/dx-common-form/dx-common-form.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DevextremeInterceptor } from './devextreme.interceptor';

const components = [
  SampleComponent,
  DevextremeComponent,
  DemoGridComponent,
  MasterSearchFormComponent,
  MasterSearchSubFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DevextremeRoutingModule,
    DxCommonFormModule,
    DxDataGridModule,
    DxToolbarModule,
    DxAccordionModule,
    DxTabPanelModule,
    DxActionSheetModule,
    DxPopupModule,
    DxScrollViewModule,
    HttpClientModule,
    DxDropDownBoxModule,
    DxListModule,
    DxDateBoxModule
  ],
  declarations: [
    ...components,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: DevextremeInterceptor, multi: true },  ]
})
export class DevextremeModule { }
