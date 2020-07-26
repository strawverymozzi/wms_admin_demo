import { NgModule } from '@angular/core';
import { SHPComponent } from './shp.component';
import { CommonWmsModule } from '../common-wms/common-wms.module';


const MODULE = [
  CommonWmsModule,
];
const COMPONENT = [
  SHPComponent
]

@NgModule({
  declarations: [
    ...COMPONENT
  ],
  imports: [
    ...MODULE
  ]
})
export class ShpModule { }
