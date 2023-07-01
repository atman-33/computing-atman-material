import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { BookerHeaderModule } from './booker-header/booker-header.module';
import { BookerHomeComponent } from './booker-home/booker-home.component';
import { BookerHomeModule } from './booker-home/home.module';
import { BookerComponent } from './booker.component';
import { BookmarkComponent } from './bookmarks/bookmark/bookmark.component';
import { BookmarkModule } from './bookmarks/bookmark/bookmark.module';

const routes: Routes = [
  {
      path: 'sites/booker', component: BookerComponent,
      children: [
          { 
            path: '',
            component: BookerHomeComponent,
            canActivate: [AuthGuard], 
            title: 'Booker | Computing Atman' 
          },
          { 
            path: 'bookmarks/:id', 
            component: BookmarkComponent,
            canActivate: [AuthGuard]
          }
      ]
  }
];

@NgModule({
  declarations: [BookerComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BookerHomeModule,
    BookerHeaderModule,
    BookmarkModule
  ],
})
export class BookerModule {}
