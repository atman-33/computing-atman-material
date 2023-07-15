import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/angular-shared/domain';
import { CategoriesModule } from '../aside/categories/categories.module';
import { TagsModule } from '../aside/tags/tags.module';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    SharedModule,
    CategoriesModule,
    TagsModule,
    MatProgressSpinnerModule
  ],
})
export class PostsModule {}
