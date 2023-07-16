## 手順

### 1. sitemap.xml を作成
- post ページのサイトマップ一覧を作成
```
node tools/generate-sitemap-xml.js
```

- トップページ等の検索対象が必要なページを sitemap.xml に追加

### 2. sitemap.xml を配置
- sitemap.xml を apps/client/src/ に保存  

- client(Angular)の project.json assets に sitemap.xml を追加  
```
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
