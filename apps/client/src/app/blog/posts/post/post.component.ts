import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consts, HtmlUtils, PrismService } from '@libs/angular-shared/domain';
import { Observable, map, switchMap } from 'rxjs';
import { Post, PostByNameGQL, RandomPostsWithSameCategoryOrTagGQL } from '../../../..//generated-types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, AfterViewChecked {

  public readonly defaultThumbnail = Consts.DEFAULT_BLOG_THUMBNAIL_PATH;

  id!: string;
  title!: string;
  date: string | undefined;
  thumbnail: string | null | undefined;
  tags: string[] | null | undefined;
  categories: string[] | null | undefined;
  article: string | null | undefined;

  highlighted = false;

  relatedPosts$!: Observable<Post[] | null>;

  isLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly postByNameGql: PostByNameGQL,
    private readonly randomPostsWithSameCategoryTagGql: RandomPostsWithSameCategoryOrTagGQL,
    private prismService: PrismService,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.postByNameGql.fetch({ name: params['name'] });
        })
      )
      .subscribe((result) => {
        this.highlighted = false;
        this.isLoading = result.loading;

        this.id = result.data.postByName._id;
        this.title = result.data.postByName.title;
        this.date = result.data.postByName.date;
        this.thumbnail = result.data.postByName.thumbnail;
        this.categories = result.data.postByName.categories;
        this.tags = result.data.postByName.tags;
        this.article = HtmlUtils.addClassToHtml(result.data.postByName.article, 'line-numbers', 'pre');

        this.relatedPosts$ = this.randomPostsWithSameCategoryTagGql
          .watch({ _id: this.id })
          .valueChanges.pipe(map(result => {
            return result.data.randomPostsWithSameCategoryOrTag as unknown as Post[];
          }));
      });
  }

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked!');
    if (!this.highlighted && this.article) {
      // console.log('highlight!');
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }

  onRelatedPostClick(postName: string) {
    setTimeout(() => window.scrollTo(0, 0));
    this.router.navigate(['blog/posts', postName]);
  }
}
