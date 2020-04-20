import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmninTestCompComponent } from './admnin-test-comp/admnin-test-comp.component';
import { AdminModule1Component } from './admin-module1.component';


const routes: Routes = [
  {
    path: '',
    component: AdminModule1Component,
    children: [
      {
        path: 'test1',
        component: AdmninTestCompComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule1RoutingModule { }
