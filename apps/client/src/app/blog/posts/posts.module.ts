import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/angular-shared/domain';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    SharedModule
  ],
})
export class PostsModule {}
