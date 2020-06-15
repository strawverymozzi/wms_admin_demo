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
  DxFormModule,
} from 'devextreme-angular';
import { SampleComponent } from './sample/sample.component';
import { CommonModule } from '@angular/common';
import { MasterSearchFormComponent } from './sample/component/master-search-form/master-search-form.component';
import { MasterSearchSubFormComponent } from './sample/component/master-search-sub-form/master-search-sub-form.component';
import { PipesModule } from '../../@pipes/pipes.module';

import { DxCommonFormModule } from '../../@dx_module/dx-common-form/dx-common-form.module';

const components = [
  DevextremeComponent,
  MasterSearchFormComponent,
  MasterSearchSubFormComponent,
  SampleComponent,

];

@NgModule({
  imports: [
    CommonModule,
    DevextremeRoutingModule,
    DxCommonFormModule,
    DxFormModule,
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
    PipesModule,
  ],
  declarations: [
    ...components,
  ],

})
export class DevextremeModule { }
