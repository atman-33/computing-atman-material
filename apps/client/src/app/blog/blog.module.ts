import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostsComponent } from './posts/posts.component';
import { PostsModule } from './posts/posts.module';

const routes: Routes = [
  {
    path: 'blog', component: BlogComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: PostsComponent, title: 'Blog list | Computing Atman' },
    ]
  }
];

@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PostsModule,
  ],
})
export class BlogModule { }
