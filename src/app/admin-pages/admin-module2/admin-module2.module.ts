import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmninTestComp2Component } from './admnin-test-comp2/admnin-test-comp2.component';
import { AdminModule2RoutingModule } from './admin-module2-routing.module';
import { AdminModule2Component } from './admin-module2.component';



@NgModule({
  imports: [
    CommonModule,
    AdminModule2RoutingModule,
    
  ],
  declarations: [
    AdminModule2Component,
    AdmninTestComp2Component
  ],
  
})
export class AdminModule2Module { }
