import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MetaTagService } from '@libs/angular-shared/domain';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Computing Atman';

  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly metaTagService: MetaTagService
  ) { }

  ngOnInit() {
    // set meta tag from app-routing.module.ts
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)).subscribe((event) => {
        this.metaTagService.updateMetaTags(
          event['description'],
          event['keywords'],
          event['title'],
          event['twittercard'],
          event['twittersite'],
          event['twitterimage'],
          event['url']
        );
      });
  }
}
