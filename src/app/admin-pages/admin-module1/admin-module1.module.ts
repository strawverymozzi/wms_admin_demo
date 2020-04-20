import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule1Component } from './admin-module1.component';

import { AdmninTestCompComponent } from './admnin-test-comp/admnin-test-comp.component';
import { AdminModule1RoutingModule } from './admin-module1-routing.module';



@NgModule({
  imports: [
    CommonModule,
    AdminModule1RoutingModule,
    
  ],
  declarations: [
    AdminModule1Component,
    AdmninTestCompComponent
  ],
 
})
export class AdminModule1Module { }
