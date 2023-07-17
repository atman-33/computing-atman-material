import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Consts } from '@libs/angular-shared/domain';
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
            title: 'Booker | ' + Consts.TITLE,
            data: {
              title: 'Booker | ' + Consts.TITLE,
              description: 'This is a web application for bookmarking URL links.',
              keywords: Consts.KEYWORDS,
              twittercard: Consts.TWITTER_CARD,
              twittersite: Consts.TWITTER_SITE,
              twitterimage: Consts.TWITTER_IMAGE,
              url: Consts.ROOT_URL + '/sites/booker', 
            } 
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
