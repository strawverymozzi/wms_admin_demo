import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
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
  DxTextBoxModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTagBoxModule,
  DxBulletModule,
  DxLoadPanelModule
} from 'devextreme-angular';

const MODULE = [
  CommonModule,
  DxTextBoxModule,
  DxButtonModule,
  DxDataGridModule,
  DxToolbarModule,
  DxAccordionModule,
  DxTabPanelModule,
  DxActionSheetModule,
  DxPopupModule,
  DxScrollViewModule,
  DxDropDownBoxModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxFormModule,
  DxDateBoxModule,
  DxTemplateModule,
  DxTagBoxModule,
  DxListModule,
  DxBulletModule,
  DxLoadPanelModule
];


@NgModule({
  declarations: [],
  imports: [

  ],
  exports: [
    ...MODULE
  ]
})
export class DevextremeModule {
  static forRoot(): ModuleWithProviders<DevextremeModule> {
    return {
      ngModule: DevextremeModule,
      providers: []
    }
  }

}
