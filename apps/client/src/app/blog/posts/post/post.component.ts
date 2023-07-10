import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@libs/angular-shared/domain';
import { switchMap } from 'rxjs';
import { Post, PostByNameGQL } from '../../../..//generated-types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  public readonly defaultThumbnail = Consts.DEFAULT_BLOG_THUMBNAIL_PATH;

  post!: Post;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postByNameGql: PostByNameGQL
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        return this.postByNameGql.fetch({ name: params['name'] });
      })
    ).subscribe((result)=>{
      this.post = result.data.postByName as unknown as Post;
    });
  }
}
