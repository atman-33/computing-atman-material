import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SitesComponent } from './sites.component';


@NgModule({
  declarations: [SitesComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [SitesComponent]
})
export class SitesModule { }
