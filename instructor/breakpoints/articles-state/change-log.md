# articles-state - Change Log

Generated on: 8/20/2025

## Overview

This document summarizes the changes made in each step of the "articles-state" breakpoint.

## 01-initial

### Files Modified (8 files)

- articles.routes.ts
- articles.ts
- types.ts

#### components/
- article-list-item.ts
- list-sort-prefs.ts

#### pages/
- list.ts
- prefs.ts

#### stores/
- articles-store.ts

*This is the initial state of the project.*

## 02-added-routing

### Files Modified (3 files)

#### src\articles/
- articles.routes.ts

#### src\articles\components/
- article-list-item.ts

#### src\articles\pages/
- details.ts

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

## 03-added-component-input-binding

### Files Modified (2 files)

#### src\app/
- app.config.ts

#### src\articles\pages/
- details.ts

*This step contains the changes for: added component input binding*

### Git Changes

<details>
<summary>Show/Hide Diff for 03-added-component-input-binding</summary>

```diff
diff --git a/src/app/app.config.ts b/src/app/app.config.ts
index 9648783..6dba020 100644
--- a/src/app/app.config.ts
+++ b/src/app/app.config.ts
@@ -2,6 +2,7 @@ import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
 import {
   PreloadAllModules,
   provideRouter,
+  withComponentInputBinding,
   withPreloading,
   withViewTransitions,
 } from '@angular/router';
@@ -15,6 +16,7 @@ export const appConfig: ApplicationConfig = {
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(
       routes,
+      withComponentInputBinding(), // if I have a route parameter and matching -named input, just do it for me.
       withPreloading(PreloadAllModules),
       withViewTransitions(),
     ),
diff --git a/src/articles/pages/details.ts b/src/articles/pages/details.ts
index 2e89571..5709f92 100644
--- a/src/articles/pages/details.ts
+++ b/src/articles/pages/details.ts
@@ -1,10 +1,12 @@
-import { Component, ChangeDetectionStrategy } from '@angular/core';
+import { Component, ChangeDetectionStrategy, input } from '@angular/core';
 
 @Component({
   selector: 'app-articles-details',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [],
-  template: ` <p>Details Coming Soon</p> `,
+  template: ` <p>Showing Details for Article {{ id() }}</p> `,
   styles: ``,
 })
-export class Details {}
+export class Details {
+  id = input.required<number>();
+}
```

</details>

## 04-get-the-state

### Files Modified (3 files)

#### src\articles\pages/
- details.ts
- list.ts

#### src\articles\stores/
- articles-store.ts

*This step contains the changes for: get the state*

### Git Changes

<details>
<summary>Show/Hide Diff for 04-get-the-state</summary>

```diff
diff --git a/src/articles/pages/details.ts b/src/articles/pages/details.ts
index 5709f92..d26bc93 100644
--- a/src/articles/pages/details.ts
+++ b/src/articles/pages/details.ts
@@ -1,4 +1,8 @@
-import { Component, ChangeDetectionStrategy, input } from '@angular/core';
+import {
+    ChangeDetectionStrategy,
+    Component,
+    input
+} from '@angular/core';
 
 @Component({
   selector: 'app-articles-details',
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index 031a71d..3063768 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -3,20 +3,19 @@ import {
   Component,
   computed,
   inject,
-  resource,
 } from '@angular/core';
 
 import { ArticleListItem } from '../components/article-list-item';
 import { ListSortPrefs } from '../components/list-sort-prefs';
 import { ArticlesStore } from '../stores/articles-store';
-import { ApiArticleItem, ApiArticles } from '../types';
+import { ApiArticleItem } from '../types';
 
 @Component({
   selector: 'app-articles-list',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [ArticleListItem, ListSortPrefs],
   template: `
-    @if (articlesResource.isLoading()) {
+    @if (store.articles.isLoading()) {
       <div class="alert alert-info">
         <span class="loading loading-dots"></span> Loading your stuff
       </div>
@@ -34,25 +33,20 @@ import { ApiArticleItem, ApiArticles } from '../types';
           </div>
         }
       </div>
-      @if (articlesResource.error()) {
-        <div class="alert alert-error">
-          There was an error. {{ articlesResource.error() }}
-        </div>
-      }
     }
   `,
   styles: ``,
 })
 export class List {
   // something new an still "experimental" in Angular, but I use it all the time.
-  articlesResource = resource<ApiArticles, unknown>({
-    loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
-  });
+  //   articlesResource = resource<ApiArticles, unknown>({
+  //     loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
+  //   });
 
   store = inject(ArticlesStore);
 
   sortedList = computed(() => {
-    const articles = this.articlesResource.value() ?? [];
+    const articles = this.store.articles.value() ?? [];
     const sortBy = this.store.sortingBy();
     return articles.toSorted((lhs: ApiArticleItem, rhs: ApiArticleItem) => {
       const leftDate = Date.parse(lhs.added);
@@ -67,7 +61,7 @@ export class List {
     });
   });
   numberOfArticles = computed(() => {
-    const articles = this.articlesResource.value();
+    const articles = this.store.articles.value();
     if (articles) {
       return articles.length;
     } else {
diff --git a/src/articles/stores/articles-store.ts b/src/articles/stores/articles-store.ts
index 501ad97..2f8f24d 100644
--- a/src/articles/stores/articles-store.ts
+++ b/src/articles/stores/articles-store.ts
@@ -1,11 +1,12 @@
 import {
   patchState,
   signalStore,
-  withHooks,
   withMethods,
+  withProps,
   withState,
 } from '@ngrx/signals';
-import { ArticleSortOptions } from '../types';
+import { ApiArticles, ArticleSortOptions } from '../types';
+import { resource } from '@angular/core';
 
 type ArticlesState = {
   sortingBy: ArticleSortOptions;
@@ -14,14 +15,18 @@ export const ArticlesStore = signalStore(
   withState<ArticlesState>({
     sortingBy: 'oldestFirst',
   }),
+  withProps(() => {
+    return {
+      articles: resource<ApiArticles, unknown>({
+        loader: () =>
+          fetch('https://fake.api.com/articles').then((r) => r.json()),
+      }),
+    };
+  }),
   withMethods((store) => {
     return {
       setSortBy: (sortingBy: ArticleSortOptions) =>
         patchState(store, { sortingBy }),
     };
   }),
-  withHooks({
-    onInit: () => console.log('Created the ArticlesStore'),
-    onDestroy: () => console.log('Destroying the articles store'),
-  }),
 );
```

</details>

## 05-loading

### Files Modified (5 files)

#### notes/
- 10-cream.excalidraw

#### src\articles/
- articles.routes.ts
- articles.ts

#### src\articles\pages/
- details.ts

#### src\articles\stores/
- articles-store.ts

*This step contains the changes for: loading*

### Git Changes

<details>
<summary>Show/Hide Diff for 05-loading</summary>

```diff
diff --git a/notes/10-cream.excalidraw b/notes/10-cream.excalidraw
new file mode 100644
index 0000000..2239323
--- /dev/null
+++ b/notes/10-cream.excalidraw
@@ -0,0 +1,353 @@
+{
+  "type": "excalidraw",
+  "version": 2,
+  "source": "https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor",
+  "elements": [
+    {
+      "id": "QecCLwRL9tmDI-FdtFwnz",
+      "type": "rectangle",
+      "x": 387,
+      "y": 199,
+      "width": 231,
+      "height": 231,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a0",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 1924532402,
+      "version": 24,
+      "versionNonce": 1147809970,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "id": "u8OwLd06xw2qVseAJ6KNa",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755718841541,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "fqhsAZh5BnmMUpxLct5Hy",
+      "type": "text",
+      "x": 400,
+      "y": 161,
+      "width": 113.35990905761719,
+      "height": 25,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a1",
+      "roundness": null,
+      "seed": 1606787246,
+      "version": 13,
+      "versionNonce": 92048946,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718766239,
+      "link": null,
+      "locked": false,
+      "text": "Angular App",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "Angular App",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "PmBI8aAn1iZXAZQ0tp5gD",
+      "type": "rectangle",
+      "x": 1040,
+      "y": 157,
+      "width": 154,
+      "height": 188,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a2",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 433072562,
+      "version": 15,
+      "versionNonce": 110570546,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "id": "u8OwLd06xw2qVseAJ6KNa",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755718841541,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "u06U3ZP3ycXaY0PoQr5GJ",
+      "type": "text",
+      "x": 1061,
+      "y": 130,
+      "width": 38.379974365234375,
+      "height": 25,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a3",
+      "roundness": null,
+      "seed": 518354606,
+      "version": 5,
+      "versionNonce": 1320529838,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718779007,
+      "link": null,
+      "locked": false,
+      "text": "API",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "API",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "9-7QqpmtRWtMnOwzqPF7P",
+      "type": "ellipse",
+      "x": 1328,
+      "y": 174,
+      "width": 115,
+      "height": 104,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a4",
+      "roundness": {
+        "type": 2
+      },
+      "seed": 932453422,
+      "version": 13,
+      "versionNonce": 1412306994,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718783660,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "jIX6-vNnhp0q-QVPXkqOv",
+      "type": "text",
+      "x": 1340,
+      "y": 151,
+      "width": 93.919921875,
+      "height": 25,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a5",
+      "roundness": null,
+      "seed": 1562850226,
+      "version": 10,
+      "versionNonce": 1227873138,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718786583,
+      "link": null,
+      "locked": false,
+      "text": "Database",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "Database",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "hMC7QMQx9VElbrFPwe8Qm",
+      "type": "text",
+      "x": 396,
+      "y": 469,
+      "width": 124.65994262695312,
+      "height": 25,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a6",
+      "roundness": null,
+      "seed": 1704301170,
+      "version": 18,
+      "versionNonce": 1163317298,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718824874,
+      "link": null,
+      "locked": false,
+      "text": "ALWAYS ONE",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "ALWAYS ONE",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "u8OwLd06xw2qVseAJ6KNa",
+      "type": "arrow",
+      "x": 614,
+      "y": 315,
+      "width": 413,
+      "height": 96,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a7",
+      "roundness": {
+        "type": 2
+      },
+      "seed": 1031296558,
+      "version": 24,
+      "versionNonce": 688212594,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718841541,
+      "link": null,
+      "locked": false,
+      "points": [
+        [
+          0,
+          0
+        ],
+        [
+          413,
+          -96
+        ]
+      ],
+      "lastCommittedPoint": null,
+      "startBinding": {
+        "elementId": "QecCLwRL9tmDI-FdtFwnz",
+        "focus": 0.1855858614208319,
+        "gap": 4
+      },
+      "endBinding": {
+        "elementId": "PmBI8aAn1iZXAZQ0tp5gD",
+        "focus": 0.4729302808672708,
+        "gap": 13
+      },
+      "startArrowhead": null,
+      "endArrowhead": "arrow",
+      "elbowed": false
+    },
+    {
+      "id": "kg6KNtZJXCwVWDV3U9J7l",
+      "type": "text",
+      "x": 1046,
+      "y": 389,
+      "width": 142.89991760253906,
+      "height": 50,
+      "angle": 0,
+      "strokeColor": "#1e1e1e",
+      "backgroundColor": "transparent",
+      "fillStyle": "solid",
+      "strokeWidth": 2,
+      "strokeStyle": "solid",
+      "roughness": 1,
+      "opacity": 100,
+      "groupIds": [],
+      "frameId": null,
+      "index": "a8",
+      "roundness": null,
+      "seed": 1017365614,
+      "version": 27,
+      "versionNonce": 288823022,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755718849089,
+      "link": null,
+      "locked": false,
+      "text": "\"Shared Store\"\narticles",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "\"Shared Store\"\narticles",
+      "autoResize": true,
+      "lineHeight": 1.25
+    }
+  ],
+  "appState": {
+    "gridSize": 20,
+    "gridStep": 5,
+    "gridModeEnabled": false,
+    "viewBackgroundColor": "#ffffff"
+  },
+  "files": {}
+}
\ No newline at end of file
diff --git a/src/articles/articles.routes.ts b/src/articles/articles.routes.ts
index 43278f4..dd8d297 100644
--- a/src/articles/articles.routes.ts
+++ b/src/articles/articles.routes.ts
@@ -1,12 +1,13 @@
 import { Routes } from '@angular/router';
 import { Articles } from './articles';
+import { Details } from './pages/details';
 import { List } from './pages/list';
 import { Prefs } from './pages/prefs';
-import { Details } from './pages/details';
 export const ARTICLES_ROUTES: Routes = [
   {
     path: '',
     component: Articles,
+    providers: [],
     children: [
       {
         path: '',
diff --git a/src/articles/articles.ts b/src/articles/articles.ts
index 14ea555..d2cbc8b 100644
--- a/src/articles/articles.ts
+++ b/src/articles/articles.ts
@@ -1,4 +1,4 @@
-import { Component, ChangeDetectionStrategy } from '@angular/core';
+import { ChangeDetectionStrategy, Component } from '@angular/core';
 import { RouterLink, RouterOutlet } from '@angular/router';
 import { ArticlesStore } from './stores/articles-store';
 
diff --git a/src/articles/pages/details.ts b/src/articles/pages/details.ts
index d26bc93..3b58567 100644
--- a/src/articles/pages/details.ts
+++ b/src/articles/pages/details.ts
@@ -1,16 +1,36 @@
 import {
-    ChangeDetectionStrategy,
-    Component,
-    input
+  ChangeDetectionStrategy,
+  Component,
+  computed,
+  inject,
+  input,
 } from '@angular/core';
+import { ArticlesStore } from '../stores/articles-store';
+import { JsonPipe } from '@angular/common';
 
 @Component({
   selector: 'app-articles-details',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [],
-  template: ` <p>Showing Details for Article {{ id() }}</p> `,
+  imports: [JsonPipe],
+  template: `
+    <p>Showing Details for Article {{ id() }}</p>
+
+    @if (selectedArticle()) {
+      <pre>{{ selectedArticle() | json }}</pre>
+    } @else {
+      <p>Four Oh Four! No Article With that Id</p>
+    }
+  `,
   styles: ``,
 })
 export class Details {
-  id = input.required<number>();
+  id = input.required<string>();
+  store = inject(ArticlesStore);
+
+  selectedArticle = computed(() => {
+    const id = this.id();
+    const articles = this.store.articles.value(); // this says - "Get me all the articles, and if they aren't loaded, load them."
+
+    return articles?.find((a) => a.id === id);
+  });
 }
diff --git a/src/articles/stores/articles-store.ts b/src/articles/stores/articles-store.ts
index 2f8f24d..c07bc39 100644
--- a/src/articles/stores/articles-store.ts
+++ b/src/articles/stores/articles-store.ts
@@ -1,6 +1,7 @@
 import {
   patchState,
   signalStore,
+  withHooks,
   withMethods,
   withProps,
   withState,
@@ -29,4 +30,11 @@ export const ArticlesStore = signalStore(
         patchState(store, { sortingBy }),
     };
   }),
+  withHooks({
+    onInit() {
+      //   setInterval(() => {
+      //     store.articles.reload();
+      //   }, 5000);
+    },
+  }),
 );
```

</details>

## 06-summary

### Files Modified (3 files)

#### src\articles\pages/
- details.ts

#### src\articles\stores/
- articles-store.ts
- user-reading-list-feature.ts

*This step contains the changes for: summary*

### Git Changes

<details>
<summary>Show/Hide Diff for 06-summary</summary>

```diff
diff --git a/src/articles/pages/details.ts b/src/articles/pages/details.ts
index 3b58567..b755045 100644
--- a/src/articles/pages/details.ts
+++ b/src/articles/pages/details.ts
@@ -17,6 +17,18 @@ import { JsonPipe } from '@angular/common';
 
     @if (selectedArticle()) {
       <pre>{{ selectedArticle() | json }}</pre>
+      @if (isOnMyReadingList()) {
+        <button
+          (click)="store.removeFromReadingList(id())"
+          class="btn btn-primary"
+        >
+          Remove From Reading List
+        </button>
+      } @else {
+        <button (click)="store.addToReadingList(id())" class="btn btn-primary">
+          Add To Reading List
+        </button>
+      }
     } @else {
       <p>Four Oh Four! No Article With that Id</p>
     }
@@ -33,4 +45,10 @@ export class Details {
 
     return articles?.find((a) => a.id === id);
   });
+
+  isOnMyReadingList = computed(() => {
+    const id = this.id();
+    const readingList = this.store.readingListIds();
+    return readingList.some((a) => a === id);
+  });
 }
diff --git a/src/articles/stores/articles-store.ts b/src/articles/stores/articles-store.ts
index c07bc39..0913ec5 100644
--- a/src/articles/stores/articles-store.ts
+++ b/src/articles/stores/articles-store.ts
@@ -8,6 +8,7 @@ import {
 } from '@ngrx/signals';
 import { ApiArticles, ArticleSortOptions } from '../types';
 import { resource } from '@angular/core';
+import { withUserReadingList } from './user-reading-list-feature';
 
 type ArticlesState = {
   sortingBy: ArticleSortOptions;
@@ -16,6 +17,7 @@ export const ArticlesStore = signalStore(
   withState<ArticlesState>({
     sortingBy: 'oldestFirst',
   }),
+  withUserReadingList(),
   withProps(() => {
     return {
       articles: resource<ApiArticles, unknown>({
diff --git a/src/articles/stores/user-reading-list-feature.ts b/src/articles/stores/user-reading-list-feature.ts
new file mode 100644
index 0000000..c6516b6
--- /dev/null
+++ b/src/articles/stores/user-reading-list-feature.ts
@@ -0,0 +1,29 @@
+import {
+  patchState,
+  signalStoreFeature,
+  withMethods,
+  withState,
+} from '@ngrx/signals';
+
+type UserReadingListState = {
+  readingListIds: string[];
+};
+export function withUserReadingList() {
+  return signalStoreFeature(
+    withState<UserReadingListState>({
+      readingListIds: [],
+    }),
+    withMethods((store) => {
+      return {
+        addToReadingList: (id: string) =>
+          patchState(store, {
+            readingListIds: [id, ...store.readingListIds()],
+          }),
+        removeFromReadingList: (id: string) =>
+          patchState(store, {
+            readingListIds: store.readingListIds().filter((r) => r !== id),
+          }),
+      };
+    }),
+  );
+}
```

</details>

## Summary

- **Total Steps**: 6
- **Breakpoint**: articles-state
- **Git Integration**: Enabled
- **Includes Diffs**: Yes

---

*Generated by BreakPoint VS Code Extension*
