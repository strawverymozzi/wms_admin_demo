import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';

const PIPES = [TranslatePipe];
@NgModule({

  imports: [
    CommonModule
  ],
  declarations: [...PIPES],
  exports: [CommonModule,...PIPES],
})
export class PipesModule { }
