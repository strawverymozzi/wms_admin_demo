import { NgModule } from '@angular/core';

import { DevextremeComponent } from './devextreme.component';
import { DevextremeRoutingModule } from './devextreme-routing.module';

import {
  DxDataGridModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTreeListModule,
  DxTemplateModule,
  DxBulletModule,
  DxToolbarModule,
  DxAccordionModule,
  DxFormModule,
  DxListModule,
  DxTabPanelModule,
  DxDateBoxModule,
  DxTextBoxModule,
  DxActionSheetModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTagBoxModule,

} from 'devextreme-angular';
import { SampleComponent } from './sample/sample.component';
import { DemoGridComponent } from './demo-grid/demo-grid.component';
import { CommonModule } from '@angular/common';
import { PartnerSearchFormComponent } from './sample/component/partner-search-form/partner-search-form.component';
import { SkukeySearchFormComponent } from './sample/component/skukey-search-form/skukey-search-form.component';
import { MasterSearchFormComponent } from './sample/component/master-search-form/master-search-form.component';
import { MasterSearchSubFormComponent } from './sample/component/master-search-sub-form/master-search-sub-form.component';

const components = [
  SampleComponent,
  DevextremeComponent,
  DemoGridComponent,
  PartnerSearchFormComponent,
  SkukeySearchFormComponent,
  MasterSearchFormComponent,
  MasterSearchSubFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DevextremeRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTreeListModule,
    DxTemplateModule,
    DxBulletModule,
    DxToolbarModule,
    DxAccordionModule,
    DxFormModule,
    DxListModule,
    DxTabPanelModule,
    DxDateBoxModule,
    DxTextBoxModule,
    DxActionSheetModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTagBoxModule
  ],
  declarations: [
    ...components,

  ],

})
export class DevextremeModule { }
