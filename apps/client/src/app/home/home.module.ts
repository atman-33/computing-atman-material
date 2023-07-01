import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GamesModule } from '../games/games.module';
import { SitesModule } from '../sites/sites.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule, 
    SitesModule,
    GamesModule
   ],
})
export class HomeModule {}
