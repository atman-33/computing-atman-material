# デプロイ手順

## ビルド
```
nx run-many --target=build --all --prod
```
or
```
nx build client --prod
nx build server --prod
```
↓
```
npm run build
```

## 起動
```
npm run start
```

## add scripts to package.json
```
  "scripts": {
    "build": "nx build client --prod && nx build server --prod",
    "start": "node dist/apps/server/main.js"
  },
```

**補足**
この起動でserverを起動する。
api以外のアクセスが届いた場合は、angular の index.htmlにアクセスを流す事で、
serverのみ起動すればフロントエンドとバックエンドが両方稼働した事となる。

### バンドルサイズ分析方法
nx run client:build:development --statsJson
npm run analyze  
=> ブラウザでバンドルサイズが高い部分を確認可能

## デプロイ
- deployg => render.com

### Settings
- Repository: 
https://github.com/atman-33/computing-atman-material

- Branch: 
```
main
```

- Build Command: 
```
node --version && npm install --force && npm run build
```

- Start Command: 
```
npm run start
```

- Auto-Deploy: 
```
Yes
```

### set node ver
- check node ver  
```
node -v
```  

- add node ver to package.json
```json
{
  "name": "@computing-atman-material/source",
  "version": "0.0.0",
  "license": "MIT",
  "engines": {
    "node": "18.x"
  },
  ...
}
```

### Error: bundle initial exceeded maximum budget.
- change maximum budget setting on project.json in Angular
```
      "configurations": {
        "production": {
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "12mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "1000kb"
            }
          ],
          "outputHashing": "all"
        },
        ...
      },
      ...
```