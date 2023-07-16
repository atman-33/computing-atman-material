import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LatestPostsModule } from '../blog/latest-posts/latest-posts.module';
import { GamesModule } from '../games/games.module';
import { SitesModule } from '../sites/sites.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule, 
    SitesModule,
    GamesModule,
    LatestPostsModule
   ],
})
export class HomeModule {}
