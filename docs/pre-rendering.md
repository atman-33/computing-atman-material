# Angular

## add Angular express-engine

*add angular express-engine*  
```
npm install @nguniversal/express-engine
npx nx g @nguniversal/express-engine:ng-add --project=client
```

> outside of nx, ng add @nguniversal/express-engine  

if any conflicts happend, `npm install --force`

## change package.json

```json
  "scripts": {
    "build": "nx build client --prod && nx build server --prod",
    "start": "node dist/apps/server/main.js",
-   "dev:ssr": "ng run client:serve-ssr",
+   "dev:ssr": "nx serve-ssr client",
    "serve:ssr": "node dist/client/server/main.js",
-   "build:ssr": "ng build && ng run client:server",
+   "build:ssr": "nx build client --prod && nx server client",
-   "prerender": "ng run client:prerender"
+   "prerender": "nx prerender client"
},
```

*updated ver*  
```json
  "scripts": {
    "build": "nx build client --prod && nx build server --prod",
    "start": "node dist/apps/server/main.js",
    "dev:ssr": "nx serve-ssr client",
    "serve:ssr": "node dist/client/server/main.js",
    "build:ssr": "nx build client --prod && nx server client",
    "prerender": "nx prerender client"
  },
```

## add proxyConfig to project.json

*apps/client/project.json*  
```json
    "serve-ssr": {
      "executor": "@nguniversal/builders:ssr-dev-server",
      "configurations": {
        "development": {
          "browserTarget": "client:build:development",
          "serverTarget": "client:server:development",
+         "proxyConfig": "apps/client/src/proxy.conf.json"
        },
        "production": {
          "browserTarget": "client:build:production",
          "serverTarget": "client:server:production",
+         "proxyConfig": "apps/client/src/proxy.conf.json"
        }
      },
      "defaultConfiguration": "development"
    },
```

# NestJS

## install @nestjs/ng-universal

```
npm i @nestjs/ng-universal --force
```

// TODO: nestjs側をangular ssr対応にする方法が不明