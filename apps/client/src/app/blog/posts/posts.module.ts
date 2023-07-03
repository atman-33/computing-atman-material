import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { USDatePipe } from '@libs/angular-shared/domain';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent,USDatePipe],
  imports: [CommonModule],
})
export class PostsModule {}
