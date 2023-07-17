# SEO対策
- set title
```ts
  constructor(
    ...
    private titleService: Title
  ) {}
```

```ts
    this.titleService.setTitle(`${this.title} | Computing Atman`);
```

- set meta tag  
app-routing.module.ts  
```ts
    {
        path: '',
        component: HomeComponent,
        title: 'Computing Atman',
        data: {
            title: 'Computing Atman',
            description: 'This website is an information site on system development and programming related to IT.',
            keywords: 'it,system,programming,db',
            twittercard: 'summary',
            twittersite: 'https://twitter.com/atman_33',
            twitterimage: 'https://computing-atman.onrender.com/assets/img/keyboard.jpg',
            url: 'https://computing-atman.onrender.com/',        
        }
    },
```
app.component.ts  
```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Computing Atman';

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
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
        this.updateDescription(event['description'], event['keywords'], event['title'], event['twittercard'], event['twittersite'], event['twitterimage'], event['url']);
      });
  }

  // update meta tag
  updateDescription(desc: string, keywords: string, title: string, twittercard: string, twittersite: string, twitterimage: string, url: string) {
    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'twitter:card', content: twittercard });
    this.meta.updateTag({ name: 'twitter:site', content: twittersite });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:image', content: twitterimage });
  }
}
```

# Google Search Console

## Google Search Console 登録
- サイトを Google Search Console に登録
- サイトのトップページ index.html に、所有権を示すhtmlタグを挿入

## sitemap を登録
### 1. sitemap.xml を作成
- post ページのサイトマップ一覧を作成
```
node tools/generate-sitemap-xml.js
```

- トップページ等の検索対象が必要なページを sitemap.xml に追加

### 2. robots.txt を作成
- robots.txt  
```
User-Agent: *
Disallow:
```
- robots.txt を apps/client/src/ に保存  
- client(Angular)の project.json assets に robots.txt を追加  

### 3. sitemap.xml を登録
- sitemap.xml を apps/client/src/ に保存  

- client(Angular)の project.json assets に sitemap.xml を追加  
```json
  "targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:browser",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/client",
        "index": "apps/client/src/index.html",
        "main": "apps/client/src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "apps/client/tsconfig.app.json",
        "assets": [
          "apps/client/src/favicon.ico", 
          "apps/client/src/assets",
          "apps/client/src/sitemap.xml",
          ...
        ],
```

- deploy

- google search console にサイトマップを登録

# Google AdSense

## ads.txt を作成
- create ads.txt in apps/client/src/
- add project.json assets *client(Angular)
```json
  "targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:browser",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/client",
        "index": "apps/client/src/index.html",
        "main": "apps/client/src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "apps/client/tsconfig.app.json",
        "assets": [
          "apps/client/src/favicon.ico", 
          "apps/client/src/assets",
          "apps/client/src/sitemap.xml",
          "apps/client/src/ads.txt"
          ...
        ],
```

- Google AdSense に審査を依頼