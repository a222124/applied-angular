# Articles - Change Log

Generated on: 8/19/2025

## Overview

This document summarizes the changes made in each step of the "Articles" breakpoint.

## 01-initial

### Files Modified (24 files)

- index.html
- main.ts
- mockServiceWorker.js
- styles.css

#### app/
- app.config.ts
- app.routes.ts
- app.ts

#### app\components\navbar/
- nav-horizontal-list.ts
- nav-list.ts
- navbar.ts

#### app\pages/
- about.ts
- home.ts

#### articles/
- articles.routes.ts
- articles.ts

#### demos/
- demos.routes.ts
- demos.ts

#### demos\pages/
- advanced-signals.ts
- basic-signals.ts

#### environments/
- environment.development.ts
- environment.ts

#### mocks/
- articles-handler.ts
- browser.ts
- handlers.ts
- welcome-handlers.ts

*This is the initial state of the project.*

## 02-added-routing

### Files Modified (3 files)

#### src\articles/
- articles.routes.ts
- articles.ts

#### src\articles\pages/
- list.ts

*This step contains the changes for: added routing*

### Git Changes

<details>
<summary>Show/Hide Diff for 02-added-routing</summary>

```diff
diff --git a/src/articles/articles.routes.ts b/src/articles/articles.routes.ts
index 9259057..28a49f4 100644
--- a/src/articles/articles.routes.ts
+++ b/src/articles/articles.routes.ts
@@ -1,9 +1,15 @@
 import { Routes } from '@angular/router';
 import { Articles } from './articles';
+import { List } from './pages/list';
 export const ARTICLES_ROUTES: Routes = [
   {
     path: '',
     component: Articles,
-    children: [],
+    children: [
+      {
+        path: '',
+        component: List,
+      },
+    ],
   },
 ];
diff --git a/src/articles/articles.ts b/src/articles/articles.ts
index 084e990..3b628b8 100644
--- a/src/articles/articles.ts
+++ b/src/articles/articles.ts
@@ -1,10 +1,11 @@
 import { Component, ChangeDetectionStrategy } from '@angular/core';
+import { RouterOutlet } from '@angular/router';
 
 @Component({
   selector: 'app-articles',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [],
-  template: ` <p>Articles Coming Soon</p> `,
+  imports: [RouterOutlet],
+  template: ` <router-outlet /> `,
   styles: ``,
 })
 export class Articles {}
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
new file mode 100644
index 0000000..75806dd
--- /dev/null
+++ b/src/articles/pages/list.ts
@@ -0,0 +1,10 @@
+import { Component, ChangeDetectionStrategy } from '@angular/core';
+
+@Component({
+  selector: 'app-articles-list',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [],
+  template: ` <p>Article List Goes Here</p> `,
+  styles: ``,
+})
+export class List {}
```

</details>

## 03-Stub-the-response

### Files Modified (1 files)

#### src\articles\pages/
- list.ts

*This step contains the changes for: Stub the response*

### Git Changes

<details>
<summary>Show/Hide Diff for 03-Stub-the-response</summary>

```diff
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index 75806dd..d7a8640 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -1,10 +1,24 @@
-import { Component, ChangeDetectionStrategy } from '@angular/core';
+import { JsonPipe } from '@angular/common';
+import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
 
 @Component({
   selector: 'app-articles-list',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [],
-  template: ` <p>Article List Goes Here</p> `,
+  imports: [JsonPipe],
+  template: `
+    <p>Article List Goes Here</p>
+    <pre>{{ articlesResource.value() | json }}</pre>
+    @if (articlesResource.error()) {
+      <div class="alert alert-error">
+        There was an error. {{ articlesResource.error() }}
+      </div>
+    }
+  `,
   styles: ``,
 })
-export class List {}
+export class List {
+  // something new an still "experimental" in Angular, but I use it all the time.
+  articlesResource = resource({
+    loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
+  });
+}
```

</details>

## 04-setup-msw

### Files Modified (2 files)

#### src/
- main.ts

#### src\mocks/
- articles-handler.ts

*This step contains the changes for: setup msw*

### Git Changes

<details>
<summary>Show/Hide Diff for 04-setup-msw</summary>

```diff
diff --git a/src/main.ts b/src/main.ts
index 190f341..8b62a1c 100644
--- a/src/main.ts
+++ b/src/main.ts
@@ -1,5 +1,18 @@
 import { bootstrapApplication } from '@angular/platform-browser';
 import { appConfig } from './app/app.config';
 import { App } from './app/app';
+import { isDevMode } from '@angular/core';
 
-bootstrapApplication(App, appConfig).catch((err) => console.error(err));
+async function prepareApp() {
+  if (isDevMode()) {
+    const { worker } = await import('./mocks/browser');
+    return worker.start({
+      onUnhandledRequest: 'bypass',
+    });
+  }
+  return Promise.resolve();
+}
+
+prepareApp().then(() => {
+  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
+});
diff --git a/src/mocks/articles-handler.ts b/src/mocks/articles-handler.ts
index 8aed879..b60e737 100644
--- a/src/mocks/articles-handler.ts
+++ b/src/mocks/articles-handler.ts
@@ -33,7 +33,7 @@ const Articles = [
 
 export const articlesHandlers = [
   http.get('https://fake.api.com/articles', async () => {
-    await delay();
+    await delay(); // 100 - 200ms delay, simulating close to real world.
     return HttpResponse.json(Articles);
   }),
 ];
```

</details>

## 05-List-Item-Component

### Files Modified (3 files)

#### src\articles/
- types.ts

#### src\articles\components/
- article-list-item.ts

#### src\articles\pages/
- list.ts

*This step contains the changes for: List Item Component*

### Git Changes

<details>
<summary>Show/Hide Diff for 05-List-Item-Component</summary>

```diff
diff --git a/src/articles/components/article-list-item.ts b/src/articles/components/article-list-item.ts
new file mode 100644
index 0000000..3845136
--- /dev/null
+++ b/src/articles/components/article-list-item.ts
@@ -0,0 +1,25 @@
+import { Component, ChangeDetectionStrategy, input } from '@angular/core';
+import { ApiArticleItem } from '../types';
+
+@Component({
+  selector: 'app-article-list-item',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [],
+  template: `
+    <div class="card card-border bg-base-100 w-96">
+      <div class="card-body">
+        <h2 class="card-title">{{ article().title }}</h2>
+        <p>{{ article().description }}</p>
+        <div class="card-actions justify-end">
+          <a [href]="article().link" target="_blank" class="btn btn-primary"
+            >Visit</a
+          >
+        </div>
+      </div>
+    </div>
+  `,
+  styles: ``,
+})
+export class ArticleListItem {
+  article = input.required<ApiArticleItem>();
+}
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index d7a8640..f7ea4ea 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -1,13 +1,18 @@
-import { JsonPipe } from '@angular/common';
-import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
+import { ChangeDetectionStrategy, Component, resource } from '@angular/core';
+import { ApiArticles } from '../types';
+import { ArticleListItem } from '../components/article-list-item';
 
 @Component({
   selector: 'app-articles-list',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [JsonPipe],
+  imports: [ArticleListItem],
   template: `
     <p>Article List Goes Here</p>
-    <pre>{{ articlesResource.value() | json }}</pre>
+    <div class="grid grid-rows">
+      @for (article of articlesResource.value(); track article.id) {
+        <app-article-list-item [article]="article" />
+      }
+    </div>
     @if (articlesResource.error()) {
       <div class="alert alert-error">
         There was an error. {{ articlesResource.error() }}
@@ -18,7 +23,7 @@ import { Component, ChangeDetectionStrategy, resource } from '@angular/core';
 })
 export class List {
   // something new an still "experimental" in Angular, but I use it all the time.
-  articlesResource = resource({
+  articlesResource = resource<ApiArticles, unknown>({
     loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
   });
 }
diff --git a/src/articles/types.ts b/src/articles/types.ts
new file mode 100644
index 0000000..e13673f
--- /dev/null
+++ b/src/articles/types.ts
@@ -0,0 +1,17 @@
+/*   {
+    "id": "1",
+    "title": "Angular Documentation",
+    "description": "Comprehensive guide to Angular framework.",
+    "link": "https://angular.dev/",
+    "added": "2025-08-18T17:14:10.029Z"
+  }*/
+
+export type ApiArticleItem = {
+  id: string;
+  title: string;
+  description: string;
+  link: string;
+  added: string;
+};
+
+export type ApiArticles = ApiArticleItem[];
```

</details>

## 06-modes

### Files Modified (2 files)

#### src\articles\pages/
- list.ts

#### src\mocks/
- articles-handler.ts

*This step contains the changes for: modes*

### Git Changes

<details>
<summary>Show/Hide Diff for 06-modes</summary>

```diff
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index f7ea4ea..9a93109 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -1,4 +1,9 @@
-import { ChangeDetectionStrategy, Component, resource } from '@angular/core';
+import {
+  ChangeDetectionStrategy,
+  Component,
+  computed,
+  resource,
+} from '@angular/core';
 import { ApiArticles } from '../types';
 import { ArticleListItem } from '../components/article-list-item';
 
@@ -7,16 +12,28 @@ import { ArticleListItem } from '../components/article-list-item';
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [ArticleListItem],
   template: `
-    <p>Article List Goes Here</p>
-    <div class="grid grid-rows">
-      @for (article of articlesResource.value(); track article.id) {
-        <app-article-list-item [article]="article" />
-      }
-    </div>
-    @if (articlesResource.error()) {
-      <div class="alert alert-error">
-        There was an error. {{ articlesResource.error() }}
+    @if (articlesResource.isLoading()) {
+      <div class="alert alert-info">
+        <span class="loading loading-dots"></span> Loading your stuff
+      </div>
+    } @else {
+      <div>
+        <p>You have {{ numberOfArticles() }} articles!</p>
       </div>
+      <div class="grid grid-rows">
+        @for (article of articlesResource.value(); track article.id) {
+          <app-article-list-item [article]="article" />
+        } @empty {
+          <div class="alert alert-info">
+            There are no articles! Check back later!
+          </div>
+        }
+      </div>
+      @if (articlesResource.error()) {
+        <div class="alert alert-error">
+          There was an error. {{ articlesResource.error() }}
+        </div>
+      }
     }
   `,
   styles: ``,
@@ -26,4 +43,13 @@ export class List {
   articlesResource = resource<ApiArticles, unknown>({
     loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
   });
+
+  numberOfArticles = computed(() => {
+    const articles = this.articlesResource.value();
+    if (articles) {
+      return articles.length;
+    } else {
+      return -1;
+    }
+  });
 }
diff --git a/src/mocks/articles-handler.ts b/src/mocks/articles-handler.ts
index b60e737..19f90f5 100644
--- a/src/mocks/articles-handler.ts
+++ b/src/mocks/articles-handler.ts
@@ -34,6 +34,7 @@ const Articles = [
 export const articlesHandlers = [
   http.get('https://fake.api.com/articles', async () => {
     await delay(); // 100 - 200ms delay, simulating close to real world.
+    // return HttpResponse.json([]);
     return HttpResponse.json(Articles);
   }),
 ];
```

</details>

## 07-sorting-started

### Files Modified (5 files)

- angular.json
- tsconfig.json

#### src\articles\components/
- article-list-item.ts
- list-sort-prefs.ts

#### src\articles\pages/
- list.ts

*This step contains the changes for: sorting started*

### Git Changes

<details>
<summary>Show/Hide Diff for 07-sorting-started</summary>

```diff
diff --git a/angular.json b/angular.json
index da82529..006872a 100644
--- a/angular.json
+++ b/angular.json
@@ -43,9 +43,7 @@
             "outputPath": "dist/frontend",
             "index": "src/index.html",
             "browser": "src/main.ts",
-            "polyfills": [
-              "zone.js"
-            ],
+            "polyfills": ["zone.js"],
             "tsConfig": "tsconfig.app.json",
             "assets": [
               {
@@ -53,9 +51,7 @@
                 "input": "public"
               }
             ],
-            "styles": [
-              "src/styles.css"
-            ],
+            "styles": ["src/styles.css"],
             "scripts": []
           },
           "configurations": {
@@ -78,9 +74,7 @@
               "optimization": false,
               "extractLicenses": false,
               "sourceMap": true,
-              "assets": [
-                "src/mockServiceWorker.js"
-              ],
+              "assets": ["src/mockServiceWorker.js"],
               "fileReplacements": [
                 {
                   "replace": "src/environments/environment.ts",
@@ -109,10 +103,7 @@
         "test": {
           "builder": "@angular/build:karma",
           "options": {
-            "polyfills": [
-              "zone.js",
-              "zone.js/testing"
-            ],
+            "polyfills": ["zone.js", "zone.js/testing"],
             "tsConfig": "tsconfig.spec.json",
             "assets": [
               {
@@ -120,19 +111,14 @@
                 "input": "public"
               }
             ],
-            "styles": [
-              "src/styles.css"
-            ],
+            "styles": ["src/styles.css"],
             "scripts": []
           }
         },
         "lint": {
           "builder": "@angular-eslint/builder:lint",
           "options": {
-            "lintFilePatterns": [
-              "src/**/*.ts",
-              "src/**/*.html"
-            ]
+            "lintFilePatterns": ["src/**/*.ts", "src/**/*.html"]
           }
         }
       }
@@ -140,9 +126,7 @@
   },
   "cli": {
     "analytics": "ae4b9926-aea3-412f-b430-989d58cc28ee",
-    "schematicCollections": [
-      "@angular-eslint/schematics"
-    ]
+    "schematicCollections": ["@angular-eslint/schematics"]
   },
   "schematics": {
     "@schematics/angular:component": {
diff --git a/src/articles/components/article-list-item.ts b/src/articles/components/article-list-item.ts
index 3845136..d84c314 100644
--- a/src/articles/components/article-list-item.ts
+++ b/src/articles/components/article-list-item.ts
@@ -1,15 +1,17 @@
 import { Component, ChangeDetectionStrategy, input } from '@angular/core';
 import { ApiArticleItem } from '../types';
+import { DatePipe } from '@angular/common';
 
 @Component({
   selector: 'app-article-list-item',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [],
+  imports: [DatePipe],
   template: `
     <div class="card card-border bg-base-100 w-96">
       <div class="card-body">
         <h2 class="card-title">{{ article().title }}</h2>
         <p>{{ article().description }}</p>
+        <p>{{ article().added | date }}</p>
         <div class="card-actions justify-end">
           <a [href]="article().link" target="_blank" class="btn btn-primary"
             >Visit</a
diff --git a/src/articles/components/list-sort-prefs.ts b/src/articles/components/list-sort-prefs.ts
new file mode 100644
index 0000000..3b40984
--- /dev/null
+++ b/src/articles/components/list-sort-prefs.ts
@@ -0,0 +1,29 @@
+import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
+
+@Component({
+  selector: 'app-list-sort-prefs',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [],
+  template: `
+    <fieldset
+      class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
+    >
+      <legend class="fieldset-legend">Sorting Options</legend>
+      <label class="label">
+        <input type="checkbox" checked="checked" class="toggle" />
+        @switch (sortOption()) {
+          @case ('newestFirst') {
+            <p>Oldest First</p>
+          }
+          @case ('oldestFirst') {
+            <p>Newest First</p>
+          }
+        }
+      </label>
+    </fieldset>
+  `,
+  styles: ``,
+})
+export class ListSortPrefs {
+  sortOption = signal<'oldestFirst' | 'newestFirst'>('oldestFirst');
+}
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index 9a93109..119b2ec 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -3,8 +3,9 @@ import {
   Component,
   computed,
   resource,
+  signal,
 } from '@angular/core';
-import { ApiArticles } from '../types';
+import { ApiArticleItem, ApiArticles } from '../types';
 import { ArticleListItem } from '../components/article-list-item';
 
 @Component({
@@ -21,7 +22,7 @@ import { ArticleListItem } from '../components/article-list-item';
         <p>You have {{ numberOfArticles() }} articles!</p>
       </div>
       <div class="grid grid-rows">
-        @for (article of articlesResource.value(); track article.id) {
+        @for (article of sortedList(); track article.id) {
           <app-article-list-item [article]="article" />
         } @empty {
           <div class="alert alert-info">
@@ -44,6 +45,20 @@ export class List {
     loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
   });
 
+  sortedList = computed(() => {
+    const articles = this.articlesResource.value() ?? [];
+    return articles.toSorted((lhs: ApiArticleItem, rhs: ApiArticleItem) => {
+      const leftDate = Date.parse(lhs.added);
+      const rightDate = Date.parse(rhs.added);
+      if (leftDate < rightDate) {
+        return 1;
+      }
+      if (leftDate > rightDate) {
+        return -1;
+      }
+      return 0;
+    });
+  });
   numberOfArticles = computed(() => {
     const articles = this.articlesResource.value();
     if (articles) {
diff --git a/tsconfig.json b/tsconfig.json
index d3dbc4a..c5bcbbd 100644
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -16,13 +16,10 @@
     "experimentalDecorators": true,
     "moduleResolution": "bundler",
     "importHelpers": true,
-    "target": "ES2022",
+    "target": "ES2023",
     "module": "ES2022",
     "useDefineForClassFields": false,
-    "lib": [
-      "ES2022",
-      "dom"
-    ]
+    "lib": ["ES2023", "dom"]
   },
   "angularCompilerOptions": {
     "enableI18nLegacyMessageIdFormat": false,
```

</details>

## Summary

- **Total Steps**: 7
- **Breakpoint**: Articles
- **Git Integration**: Enabled
- **Includes Diffs**: Yes

---

*Generated by BreakPoint VS Code Extension*
