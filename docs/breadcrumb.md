## links
https://betterprogramming.pub/add-breadcrumbs-to-your-angular-app-in-just-5-minutes-3119e376e901  

https://udayvunnam.github.io/xng-breadcrumb/#/  

## install npm i xng-breadcrumb
```bash
npm i xng-breadcrumb
```

## how to use
```html
<xng-breadcrumb [separator]="iconTemplate"></xng-breadcrumb>
<ng-template #iconTemplate>
    <mat-icon>chevron_right</mat-icon>
</ng-template>
```

```ts
const routes: Routes = [
  {
    path: 'blog', component: BlogComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'posts',
        component: PostsComponent,
        title: 'Blog list | Computing Atman',
        data: { breadcrumb: { skip: true } },
      },
      {
        path: 'posts/:name',
        component: PostComponent,
        data: {
          breadcrumb: (resolvedName: string) => `Viewing "${resolvedName}" now!`
        }
      },
    ]
  }
];
```

```scss
:host::ng-deep .xng-breadcrumb-root {
    padding: 8px 16px;
    display: inline-block;
    border-radius: 4px;
    // background-color: #e7f1f1;
}

:host::ng-deep .xng-breadcrumb-separator {
    padding: 0 4px;
}

:host::ng-deep .xng-breadcrumb-trail {
    padding: 0 4px;
    margin-bottom: 0;
}

:host::ng-deep .xng-breadcrumb-link {
    color: #2D4CC8;
}
```

