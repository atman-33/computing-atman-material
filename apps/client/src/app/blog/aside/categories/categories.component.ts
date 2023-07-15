import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryCount, CategoryCountsGQL } from '../../../../generated-types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit{

  // categories: CategoryCount[] = [];
  categories$!: Observable<CategoryCount[]>;

  constructor(
    private readonly categoryCountGql: CategoryCountsGQL
  ) {}

  ngOnInit(): void { 
    this.categories$ = this.categoryCountGql
    .watch()
    .valueChanges.pipe(map(result => result.data.categoryCounts));
  }

  onLinkClick(){
    setTimeout(() => window.scrollTo(0, 0));
  }
}
