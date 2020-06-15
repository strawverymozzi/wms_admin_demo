import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevextremeComponent } from './devextreme.component';
import { SampleComponent } from './sample/sample.component';
import { AdminProgramInitResolver } from '../../@program/program.admin-init-resolver';

const routes: Routes = [
  {
    path: '',
    component: DevextremeComponent,
    children: [
      {
        path: 'application3',
        component: SampleComponent,
        resolve: { programInit: AdminProgramInitResolver },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevextremeRoutingModule { }
