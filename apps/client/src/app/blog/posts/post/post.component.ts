import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consts, HtmlUtils, PrismService } from '@libs/angular-shared/domain';
import { switchMap } from 'rxjs';
import { PostByNameGQL } from '../../../..//generated-types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit,AfterViewChecked  {

  public readonly defaultThumbnail = Consts.DEFAULT_BLOG_THUMBNAIL_PATH;

  title!: string;
  date: string | undefined;
  thumbnail: string | null | undefined;
  tags: string[] | null | undefined;
  categories: string[] | null | undefined;
  article: string | null | undefined;

  highlighted = false;

  isLoading = true;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postByNameGql: PostByNameGQL,
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
        this.isLoading = result.loading;

        this.title = result.data.postByName.title;
        this.date = result.data.postByName.date;
        this.thumbnail = result.data.postByName.thumbnail;
        this.categories = result.data.postByName.categories;
        this.tags = result.data.postByName.tags;
        this.article = HtmlUtils.addClassToHtml(result.data.postByName.article, 'line-numbers', 'pre');
      });
  }

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked!');
    if (!this.highlighted && this.article) {
      // console.log('highlight!');

      this.prismService.highlightAll();
      this.highlighted = true;    }
  }
}
