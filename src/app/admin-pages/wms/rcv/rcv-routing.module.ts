import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RCVComponent } from './rcv.component';
import { AdminProgramInitResolver } from '../../../@program/program.admin-init-resolver';

const routes: Routes = [
  {
    path: '',
    component: RCVComponent,
    resolve: { programInit: AdminProgramInitResolver },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcvRoutingModule { }
