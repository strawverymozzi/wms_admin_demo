import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmninTestComp2Component } from './admnin-test-comp2/admnin-test-comp2.component';
import { AdminModule2Component } from './admin-module2.component';


const routes: Routes = [
  {
    path: '',
    component: AdminModule2Component,
    children: [
      {
        path: 'test2',
        component: AdmninTestComp2Component,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule2RoutingModule { }
