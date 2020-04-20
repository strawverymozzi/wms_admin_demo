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
} from 'devextreme-angular';
import { SampleComponent } from './sample/sample.component';
import { DemoGridComponent } from './demo-grid/demo-grid.component';
import { CommonModule } from '@angular/common';
import { MasterSearchFormComponent } from './sample/component/master-search-form/master-search-form.component';
import { MasterSearchSubFormComponent } from './sample/component/master-search-sub-form/master-search-sub-form.component';
import { DxCommonFormModule } from '../../@dx_module/dx-common-form/dx-common-form.module';

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
  ],
  declarations: [
    ...components,

  ],

})
export class DevextremeModule { }
