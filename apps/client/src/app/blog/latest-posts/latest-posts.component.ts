import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consts } from '@libs/angular-shared/domain';
import { Post, PostsConnectionGQL } from '../../../generated-types';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {

  public readonly defaultThumbnail = Consts.DEFAULT_BLOG_THUMBNAIL_PATH;

  posts!: Post[];  
  isLoading = true;

  constructor(
    private readonly router: Router,
    private readonly postsConnectionGql: PostsConnectionGQL
  ) { }

  ngOnInit(): void {
    this.getPostsConnection(null, null, 6, null, '');
  }

  getPostsConnection(
    first: number | null,
    after: string | null | undefined,
    last: number | null,
    before: string | null | undefined,
    query: string,
  ) {
    this.postsConnectionGql.fetch({
      first: first,
      after: after,
      last: last,
      before: before,
      query: query,
    }).subscribe(result => {
      this.posts = result.data.postsConnection.nodes as unknown as Post[];
      this.posts = this.posts.slice().reverse();
    });
  }
}
