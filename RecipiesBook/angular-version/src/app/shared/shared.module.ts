import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import {FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    FilterPipe
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    FilterPipe,
  ]
})
export class SharedModule {}
