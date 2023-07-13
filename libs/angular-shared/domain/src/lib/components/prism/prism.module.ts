import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrismComponent } from './prism.component';



@NgModule({
  declarations: [PrismComponent],
  imports: [
    CommonModule
  ],
  exports: [PrismComponent]
})
export class PrismModule { }
