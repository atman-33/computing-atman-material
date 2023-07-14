import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagsComponent } from './tags.component';

@NgModule({
  declarations: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TagsComponent],
})
export class TagsModule {}
