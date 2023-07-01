import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AddLinkModule } from './add-link/add-link.module';
import { BookmarkComponent } from './bookmark.component';

@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AddLinkModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
})
export class BookmarkModule {}
