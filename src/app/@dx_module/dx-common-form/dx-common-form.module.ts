import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerSearchFormComponent } from './partner-search-form/partner-search-form.component';
import { SkukeySearchFormComponent } from './skukey-search-form/skukey-search-form.component';
import { DxButtonModule, DxCheckBoxModule, DxSelectBoxModule, DxFormModule, DxDateBoxModule, DxTextBoxModule, DxTemplateModule, DxTagBoxModule, DxListModule, DxBulletModule } from 'devextreme-angular';

const components = [
  PartnerSearchFormComponent,
  SkukeySearchFormComponent,
];
const modules = [
  DxTextBoxModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxFormModule,
  DxDateBoxModule,
  DxTemplateModule,
  DxTagBoxModule,
  DxListModule,
  DxBulletModule,
]

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  declarations: [
    ...components,

  ],
  exports: [
    ...components, ...modules
  ]
})
export class DxCommonFormModule { }
