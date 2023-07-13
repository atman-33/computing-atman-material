import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TagCount, TagCountsGQL } from '../../../..//generated-types';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit{
  tags$!: Observable<TagCount[]>;

  constructor(
    private readonly tagCountGql: TagCountsGQL
  ) {}

  ngOnInit(): void {
    
    this.tags$ = this.tagCountGql
    .watch()
    .valueChanges.pipe(map(result => result.data.tagCounts));
  }
}
