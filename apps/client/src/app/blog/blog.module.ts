import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: 'blog', component: BlogComponent,
    children: [
      
    ]
  }
]

@NgModule({
  declarations: [BlogComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
})
export class BlogModule {}
