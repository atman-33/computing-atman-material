import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Consts } from '@libs/angular-shared/domain';
import { Observable } from 'rxjs';
import { Post, PostsConnectionGQL } from '../../../generated-types';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  public readonly defaultThumbnail = Consts.DEFAULT_BLOG_THUMBNAIL_PATH;

  posts!: Post[];

  startCursor?: string | null | undefined;
  endCursor?: string | null | undefined;

  length!: number;
  pageSize = 6;
  pageIndex = 0;
  pageEvent!: PageEvent;

  query = '';

  constructor(
    private readonly postsConnectionGql: PostsConnectionGQL
  ) { }

  ngOnInit(): void {
    this.getPostsConnection(null, '', this.pageSize, '', this.query);
  }

  handlePageEvent(e: PageEvent) {
    setTimeout(() => window.scrollTo(0, 0));

    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    if (this.pageIndex === 0) {
      console.log('first page');
      this.getPostsConnection(null, null, this.pageSize, '', this.query);
      return;
    }

    if (Math.floor(this.length / this.pageSize) === this.pageIndex) {
      console.log('last page');
      const totalCount$ = this.getPostsTotalCount(this.query);
      totalCount$.subscribe(totalCount => {
        const calculatedValue = totalCount - this.pageSize * this.pageIndex;
        console.log(totalCount);
        this.getPostsConnection(calculatedValue, '', null, null, this.query);
      });
      return;
    }

    if (!e.previousPageIndex) {
      if (this.pageIndex === 1) {
        console.log('next page');
        this.getPostsConnection(null, null, this.pageSize, this.startCursor, this.query);
        return;
      }
    } else {
      if (this.pageIndex === e.previousPageIndex + 1) {
        console.log('next page');
        this.getPostsConnection(null, null, this.pageSize, this.startCursor, this.query);
        return;
      }
    }

    if (e.previousPageIndex) {
      if (this.pageIndex === e.previousPageIndex - 1) {
        console.log('previous page');
        this.getPostsConnection(this.pageSize, this.endCursor, null, null, this.query);
        return;
      }
    }
  }

  getPostsConnection(
    first: number | null,
    after: string | null | undefined,
    last: number | null,
    before: string | null | undefined,
    query: string
  ) {
    this.postsConnectionGql.fetch({
      first: first,
      after: after,
      last: last,
      before: before,
      query: query
    }).subscribe(result => {
      this.posts = result.data.postsConnection.nodes as unknown as Post[];
      this.length = result.data.postsConnection.totalCount;
      this.startCursor = result.data.postsConnection.pageInfo.startCursor;
      this.endCursor = result.data.postsConnection.pageInfo.endCursor;

      this.posts = this.posts.slice().reverse();
    });
  }

  getPostsTotalCount(query: string): Observable<number> {
    return new Observable<number>(observer => {
      this.postsConnectionGql.fetch({
        query: query
      }).subscribe(result => {
        observer.next(result.data.postsConnection.totalCount);
        observer.complete();
      });
    });
  }

  searchQuery() {
    console.log('Search query:', this.query);
    this.getPostsConnection(null, '', this.pageSize, '', this.query);
  }

  clearQuery() {
    this.query = '';
  }
}
