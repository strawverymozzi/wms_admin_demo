import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevextremeComponent } from './devextreme.component';
import { SampleComponent } from './sample/sample.component';
import { Translator } from '../../@translate/translator';

const routes: Routes = [
  {
    path: '',
    component: DevextremeComponent,
    children: [
      {
        path: 'application3',
        component: SampleComponent,
      },

    ],
  },
];
routes.forEach((v, i, a) => v["resolve"] = { dictionary: Translator });

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevextremeRoutingModule { }
