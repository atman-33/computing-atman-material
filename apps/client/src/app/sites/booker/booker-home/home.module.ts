import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { BookerHomeComponent } from './booker-home.component';

@NgModule({
  declarations: [BookerHomeComponent],
  imports: [CommonModule, BookmarksModule],
})
export class BookerHomeModule {}
