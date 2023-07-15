import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BlogComponent } from './blog.component';
import { PostComponent } from './posts/post/post.component';
import { PostModule } from './posts/post/post.module';
import { PostsComponent } from './posts/posts.component';
import { PostsModule } from './posts/posts.module';

const routes: Routes = [
  {
    path: 'blog', component: BlogComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'posts',
        component: PostsComponent,
        title: 'Blog list | Computing Atman',
        data: { breadcrumb: { skip: true } },
      },
      {
        path: 'posts/:name',
        component: PostComponent,
        data: {
          breadcrumb: (resolvedName: string) => `Viewing "${resolvedName}" now!`
        }
      },
    ]
  }
];

@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PostsModule,
    PostModule,
    BreadcrumbModule,
    MatIconModule
  ],
})
export class BlogModule { }
