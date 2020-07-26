import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WmsComponent } from './wms.component';


const routes: Routes = [
  {
    path: '',
    component: WmsComponent,
    children: [
      {
        path: '',
        redirectTo: 'rcv'
      },
      {
        path: 'application3',
        loadChildren: () => import('./rcv/rcv.module')
          .then(m => m.RcvModule)
      },
      // {
      //   path: 'application3',
      //   loadChildren: () => import('./shp/shp.module')
      //     .then(m => m.ShpModule)
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WmsRoutingModule { }
