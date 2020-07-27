import { NgModule } from '@angular/core';
import { SearchInputPtnkeyComponent } from './search-input-ptnkey/search-input-ptnkey.component';
import { SearchInputSkukeyComponent } from './search-input-skukey/search-input-skukey.component';
import { SearchHelperComponent } from './search-helper/search-helper.component';
import { LookUpDirective } from './_directive/look-up.directive';
import { DevextremeModule } from '../../../@devextreme/devextreme.module';
import { PipesModule } from '../../../@pipes/pipes.module';

const MODULE = [
  DevextremeModule,
];
const COMPONENT = [
  SearchInputPtnkeyComponent,
  SearchInputSkukeyComponent,
  SearchHelperComponent,
  LookUpDirective,
];

@NgModule({
  declarations: [...COMPONENT,],
  imports: [
    ...MODULE
  ],
  exports: [
    ...MODULE,
    ...COMPONENT,
    PipesModule
  ]
})
export class CommonWmsModule {

}