import { Component, OnInit } from '@angular/core';
import { Shared } from '@libs/angular-shared/domain';
import { Observable, map } from 'rxjs';
import { Post, PostsGQL } from '../../../generated-types';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  public readonly defaultThumbnail = Shared.DEFAULT_BLOG_THUMBNAIL_PATH;
  // public readonly articleLeadMaxLength = Shared.ARTICLE_LEAD_MAX_LENGTH;

  posts$!: Observable<Post[]>;

  constructor(
    private readonly postsGql: PostsGQL
  ) { }

  ngOnInit(): void {

    // If you don't need to observe changes, using fetch() is fine.
    this.posts$ = this.postsGql.fetch().pipe(map(result => result.data.posts))
  }
}
