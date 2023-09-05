import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsInputComponent } from './components/cs-input/cs-input.component';



@NgModule({
  declarations: [
    CsInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CsInputComponent
  ]
})
export class CsInputModule { }
