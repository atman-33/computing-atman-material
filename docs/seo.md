# Google Search Console
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

## SEO対策
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