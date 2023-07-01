import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BookerHeaderComponent } from './booker-header.component';

@NgModule({
  declarations: [BookerHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule],
  exports: [
    BookerHeaderComponent
  ]
})
export class BookerHeaderModule { }
