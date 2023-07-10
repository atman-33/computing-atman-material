import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@libs/angular-shared/domain';
import { PostComponent } from './post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class PostModule { }
