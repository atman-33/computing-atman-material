import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@libs/angular-shared/domain';
import { switchMap } from 'rxjs';
import { PostByNameGQL } from '../../../..//generated-types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  public readonly defaultThumbnail = Consts.DEFAULT_BLOG_THUMBNAIL_PATH;

  title!: string;
  date: string | undefined;
  thumbnail: string | null | undefined;
  tags: string[] | null | undefined;
  categories: string[] | null | undefined;
  article: string | null | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postByNameGql: PostByNameGQL,
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
        this.title = result.data.postByName.title;
        this.date = result.data.postByName.date;
        this.thumbnail = result.data.postByName.thumbnail;
        this.categories = result.data.postByName.categories;
        this.tags = result.data.postByName.tags;
        this.article = result.data.postByName.article;
      });
  }
}
