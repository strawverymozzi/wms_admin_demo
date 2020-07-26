import { NgModule } from '@angular/core';

import { WmsRoutingModule } from './wms-routing.module';
import { WmsComponent } from './wms.component';
import { CommonWmsModule } from './common-wms/common-wms.module';
import { RcvModule } from './rcv/rcv.module';
import { ShpModule } from './shp/shp.module';
import { CommonModule } from '@angular/common';

const MODULE = [
  CommonModule,
  WmsRoutingModule,
  CommonWmsModule,
  RcvModule,
  ShpModule,
];

const COMPONENT = [
  WmsComponent,
]

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    ...MODULE
  ]
})
export class WmsModule { }
