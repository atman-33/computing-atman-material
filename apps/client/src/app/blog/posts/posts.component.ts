import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@libs/angular-shared/domain';
import { Observable, map } from 'rxjs';
import { Post, PostsConnectionByQueryCategoryTagGQL } from '../../../generated-types';

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
  queryParamsCategory = null;
  queryParamsTag = null;

  isLoading = true;

  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private readonly postsConnectionGql: PostsConnectionByQueryCategoryTagGQL
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => window.scrollTo(0, 0));

    // observe query params
    this.route.queryParams.pipe(
      map(params => ({
        category: params['category'] || null,
        tag: params['tag'] || null,
      }))
    ).subscribe((result) => {
      if (
        this.queryParamsCategory !== result.category ||
        this.queryParamsTag !== result.tag
      ) {
        // If change query params, initialize page index.
        this.pageIndex = 0;
        this.paginator.pageIndex = this.pageIndex;
      }

      this.queryParamsCategory = result.category;
      this.queryParamsTag = result.tag;
      this.getPostsConnection(null, '', this.pageSize, '', this.query, this.queryParamsCategory, this.queryParamsTag);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.isLoading = true;
    setTimeout(() => window.scrollTo(0, 0));

    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    if (this.pageIndex === 0) {
      console.log('first page');
      this.getPostsConnection(null, null, this.pageSize, '', this.query, this.queryParamsCategory, this.queryParamsTag);
      return;
    }

    if (Math.floor(this.length / this.pageSize) === this.pageIndex) {
      console.log('last page');
      const totalCount$ = this.getPostsTotalCount(this.query, this.queryParamsCategory, this.queryParamsTag);
      totalCount$.subscribe(totalCount => {
        const calculatedValue = totalCount - this.pageSize * this.pageIndex;
        console.log(totalCount);
        this.getPostsConnection(calculatedValue, '', null, null, this.query, this.queryParamsCategory, this.queryParamsTag);
      });
      return;
    }

    if (!e.previousPageIndex) {
      if (this.pageIndex === 1) {
        console.log('next page');
        this.getPostsConnection(null, null, this.pageSize, this.startCursor, this.query, this.queryParamsCategory, this.queryParamsTag);
        return;
      }
    } else {
      if (this.pageIndex === e.previousPageIndex + 1) {
        console.log('next page');
        this.getPostsConnection(null, null, this.pageSize, this.startCursor, this.query, this.queryParamsCategory, this.queryParamsTag);
        return;
      }
    }

    if (e.previousPageIndex) {
      if (this.pageIndex === e.previousPageIndex - 1) {
        console.log('previous page');
        this.getPostsConnection(this.pageSize, this.endCursor, null, null, this.query, this.queryParamsCategory, this.queryParamsTag);
        return;
      }
    }
  }

  getPostsConnection(
    first: number | null,
    after: string | null | undefined,
    last: number | null,
    before: string | null | undefined,
    query: string,
    category: string | null = null,
    tag: string | null = null
  ) {
    this.postsConnectionGql.fetch({
      first: first,
      after: after,
      last: last,
      before: before,
      query: query,
      category: category,
      tag: tag
    }).subscribe(result => {
      this.posts = result.data.postsConnectionByQueryCategoryTag.nodes as unknown as Post[];
      this.length = result.data.postsConnectionByQueryCategoryTag.totalCount;
      this.startCursor = result.data.postsConnectionByQueryCategoryTag.pageInfo.startCursor;
      this.endCursor = result.data.postsConnectionByQueryCategoryTag.pageInfo.endCursor;

      this.posts = this.posts.slice().reverse();
      this.isLoading = result.loading;
    });
  }

  getPostsTotalCount(
    query: string,
    category: string | null = null,
    tag: string | null = null
  ): Observable<number> {
    return new Observable<number>(observer => {
      this.postsConnectionGql.fetch({
        query: query,
        category: category,
        tag: tag
      }).subscribe(result => {
        observer.next(result.data.postsConnectionByQueryCategoryTag.totalCount);
        observer.complete();
      });
    });
  }

  searchQuery() {
    console.log('Search query:', this.query);
    this.queryParamsCategory = null;
    this.queryParamsTag = null;
    this.getPostsConnection(null, '', this.pageSize, '', this.query);
  }

  clearQuery() {
    this.query = '';
    this.queryParamsCategory = null;
    this.queryParamsTag = null;
    this.getPostsConnection(null, '', this.pageSize, '', this.query);
  }
}
