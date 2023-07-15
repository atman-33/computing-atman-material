import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@libs/angular-shared/domain';
import { LatestPostsComponent } from './latest-posts.component';

@NgModule({
  declarations: [LatestPostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [LatestPostsComponent]
})
export class LatestPostsModule {}
