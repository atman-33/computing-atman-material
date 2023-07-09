import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { USDatePipe } from '@libs/angular-shared/domain';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent,USDatePipe],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule
  ],
})
export class PostsModule {}
