# articles-components - Change Log

Generated on: 8/19/2025

## Overview

This document summarizes the changes made in each step of the "articles-components" breakpoint.

## 01-initial

### Files Modified (6 files)

- articles.routes.ts
- articles.ts
- types.ts

#### components/
- article-list-item.ts
- list-sort-prefs.ts

#### pages/
- list.ts

*This is the initial state of the project.*

## 02-inputs-outputs

### Files Modified (4 files)

#### notes/
- 07-component-communication.excalidraw

#### src\articles/
- types.ts

#### src\articles\components/
- list-sort-prefs.ts

#### src\articles\pages/
- list.ts

*This step contains the changes for: inputs outputs*

### Git Changes

<details>
<summary>Show/Hide Diff for 02-inputs-outputs</summary>

```diff
diff --git a/notes/07-component-communication.excalidraw b/notes/07-component-communication.excalidraw
new file mode 100644
index 0000000..e69de29
diff --git a/src/articles/components/list-sort-prefs.ts b/src/articles/components/list-sort-prefs.ts
index ee80f1b..4a675bb 100644
--- a/src/articles/components/list-sort-prefs.ts
+++ b/src/articles/components/list-sort-prefs.ts
@@ -1,4 +1,10 @@
-import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
+import {
+  Component,
+  ChangeDetectionStrategy,
+  signal,
+  output,
+} from '@angular/core';
+import { ArticleSortOptions } from '../types';
 
 @Component({
   selector: 'app-list-sort-prefs',
@@ -7,14 +13,14 @@ import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
   template: ` <div class="join">
     <button
       [disabled]="sortOption() === 'oldestFirst'"
-      (click)="sortOption.set('oldestFirst')"
+      (click)="changeSortOrder('oldestFirst')"
       class="btn join-item"
     >
       Oldest First
     </button>
     <button
       [disabled]="sortOption() === 'newestFirst'"
-      (click)="sortOption.set('newestFirst')"
+      (click)="changeSortOrder('newestFirst')"
       class="btn join-item"
     >
       Newest First
@@ -23,5 +29,11 @@ import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
   styles: ``,
 })
 export class ListSortPrefs {
-  sortOption = signal<'oldestFirst' | 'newestFirst'>('oldestFirst');
+  sortOption = signal<ArticleSortOptions>('oldestFirst');
+  sortChanged = output<ArticleSortOptions>();
+
+  changeSortOrder(by: ArticleSortOptions) {
+    this.sortOption.set(by);
+    this.sortChanged.emit(by); // send  a message to the parent component that this happened.
+  }
 }
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index 119b2ec..0291b9f 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -5,13 +5,14 @@ import {
   resource,
   signal,
 } from '@angular/core';
-import { ApiArticleItem, ApiArticles } from '../types';
+import { ApiArticleItem, ApiArticles, ArticleSortOptions } from '../types';
 import { ArticleListItem } from '../components/article-list-item';
+import { ListSortPrefs } from '../components/list-sort-prefs';
 
 @Component({
   selector: 'app-articles-list',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [ArticleListItem],
+  imports: [ArticleListItem, ListSortPrefs],
   template: `
     @if (articlesResource.isLoading()) {
       <div class="alert alert-info">
@@ -20,6 +21,7 @@ import { ArticleListItem } from '../components/article-list-item';
     } @else {
       <div>
         <p>You have {{ numberOfArticles() }} articles!</p>
+        <app-list-sort-prefs (sortChanged)="sortOrderChanged($event)" />
       </div>
       <div class="grid grid-rows">
         @for (article of sortedList(); track article.id) {
@@ -45,16 +47,21 @@ export class List {
     loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
   });
 
+  sortBy = signal<ArticleSortOptions>('newestFirst');
+  sortOrderChanged(by: ArticleSortOptions) {
+    this.sortBy.set(by);
+  }
   sortedList = computed(() => {
     const articles = this.articlesResource.value() ?? [];
+    const sortBy = this.sortBy();
     return articles.toSorted((lhs: ApiArticleItem, rhs: ApiArticleItem) => {
       const leftDate = Date.parse(lhs.added);
       const rightDate = Date.parse(rhs.added);
       if (leftDate < rightDate) {
-        return 1;
+        return sortBy === 'oldestFirst' ? 1 : -1;
       }
       if (leftDate > rightDate) {
-        return -1;
+        return sortBy === 'newestFirst' ? -1 : 1;
       }
       return 0;
     });
diff --git a/src/articles/types.ts b/src/articles/types.ts
index e13673f..18dff7b 100644
--- a/src/articles/types.ts
+++ b/src/articles/types.ts
@@ -15,3 +15,5 @@ export type ApiArticleItem = {
 };
 
 export type ApiArticles = ApiArticleItem[];
+
+export type ArticleSortOptions = 'oldestFirst' | 'newestFirst';
```

</details>

## 03-moving-to-model

### Files Modified (3 files)

#### notes/
- 07-component-communication.excalidraw

#### src\articles\components/
- list-sort-prefs.ts

#### src\articles\pages/
- list.ts

*This step contains the changes for: moving to model*

### Git Changes

<details>
<summary>Show/Hide Diff for 03-moving-to-model</summary>

```diff
diff --git a/notes/07-component-communication.excalidraw b/notes/07-component-communication.excalidraw
index e69de29..b4e8ce9 100644
--- a/notes/07-component-communication.excalidraw
+++ b/notes/07-component-communication.excalidraw
@@ -0,0 +1,299 @@
+{
+  "type": "excalidraw",
+  "version": 2,
+  "source": "https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor",
+  "elements": [
+    {
+      "id": "zHbvFa_pT5zhrEcf5sH0f",
+      "type": "rectangle",
+      "x": 380,
+      "y": 194,
+      "width": 446,
+      "height": 352,
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
+      "seed": 1089346239,
+      "version": 13,
+      "versionNonce": 720124913,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755626408539,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "plKDU99gf1v6-Wfh0nbGl",
+      "type": "rectangle",
+      "x": 455,
+      "y": 416,
+      "width": 243,
+      "height": 80,
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
+      "roundness": {
+        "type": 3
+      },
+      "seed": 539503551,
+      "version": 24,
+      "versionNonce": 1810494623,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "id": "rUecAB1llHyNlRhXsEGq4",
+          "type": "arrow"
+        },
+        {
+          "id": "BTBTC8zOmG1e4AlHobjzf",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755626446950,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "rUecAB1llHyNlRhXsEGq4",
+      "type": "arrow",
+      "x": 465,
+      "y": 344,
+      "width": 28,
+      "height": 78,
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
+        "type": 2
+      },
+      "seed": 125910207,
+      "version": 30,
+      "versionNonce": 1592645649,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755626447322,
+      "link": null,
+      "locked": false,
+      "points": [
+        [
+          0,
+          0
+        ],
+        [
+          28,
+          78
+        ]
+      ],
+      "lastCommittedPoint": null,
+      "startBinding": null,
+      "endBinding": {
+        "elementId": "plKDU99gf1v6-Wfh0nbGl",
+        "focus": -0.5247711616495232,
+        "gap": 6
+      },
+      "startArrowhead": null,
+      "endArrowhead": "arrow",
+      "elbowed": false
+    },
+    {
+      "id": "4mXDxeHOuTGlUsNYGQRH_",
+      "type": "text",
+      "x": 473,
+      "y": 323,
+      "width": 65.03994750976562,
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
+      "seed": 1948728799,
+      "version": 17,
+      "versionNonce": 1533488415,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755626446950,
+      "link": null,
+      "locked": false,
+      "text": "Inputs",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "Inputs",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "BTBTC8zOmG1e4AlHobjzf",
+      "type": "arrow",
+      "x": 650,
+      "y": 428,
+      "width": 59,
+      "height": 109,
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
+      "seed": 740883199,
+      "version": 30,
+      "versionNonce": 746237425,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "type": "text",
+          "id": "NQE2ITKr1bRKbwh9JOAyX"
+        }
+      ],
+      "updated": 1755626447322,
+      "link": null,
+      "locked": false,
+      "points": [
+        [
+          0,
+          0
+        ],
+        [
+          59,
+          -109
+        ]
+      ],
+      "lastCommittedPoint": null,
+      "startBinding": {
+        "elementId": "plKDU99gf1v6-Wfh0nbGl",
+        "focus": 0.40756881468901124,
+        "gap": 12
+      },
+      "endBinding": null,
+      "startArrowhead": null,
+      "endArrowhead": "arrow",
+      "elbowed": false
+    },
+    {
+      "id": "NQE2ITKr1bRKbwh9JOAyX",
+      "type": "text",
+      "x": 629.1100158691406,
+      "y": 274,
+      "width": 66.77996826171875,
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
+      "seed": 911133695,
+      "version": 8,
+      "versionNonce": 1356045567,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755626437355,
+      "link": null,
+      "locked": false,
+      "text": "output",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "center",
+      "verticalAlign": "middle",
+      "containerId": "BTBTC8zOmG1e4AlHobjzf",
+      "originalText": "output",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "v8-f8p93j7r4-MG8Vlgj8",
+      "type": "text",
+      "x": 427,
+      "y": 237,
+      "width": 85.43994140625,
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
+      "seed": 2030078431,
+      "version": 10,
+      "versionNonce": 2053949183,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755626454334,
+      "link": null,
+      "locked": false,
+      "text": "sortBy()",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "sortBy()",
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
diff --git a/src/articles/components/list-sort-prefs.ts b/src/articles/components/list-sort-prefs.ts
index 4a675bb..0e96a76 100644
--- a/src/articles/components/list-sort-prefs.ts
+++ b/src/articles/components/list-sort-prefs.ts
@@ -3,6 +3,7 @@ import {
   ChangeDetectionStrategy,
   signal,
   output,
+  model,
 } from '@angular/core';
 import { ArticleSortOptions } from '../types';
 
@@ -13,14 +14,14 @@ import { ArticleSortOptions } from '../types';
   template: ` <div class="join">
     <button
       [disabled]="sortOption() === 'oldestFirst'"
-      (click)="changeSortOrder('oldestFirst')"
+      (click)="sortOption.set('oldestFirst')"
       class="btn join-item"
     >
       Oldest First
     </button>
     <button
       [disabled]="sortOption() === 'newestFirst'"
-      (click)="changeSortOrder('newestFirst')"
+      (click)="sortOption.set('newestFirst')"
       class="btn join-item"
     >
       Newest First
@@ -29,11 +30,5 @@ import { ArticleSortOptions } from '../types';
   styles: ``,
 })
 export class ListSortPrefs {
-  sortOption = signal<ArticleSortOptions>('oldestFirst');
-  sortChanged = output<ArticleSortOptions>();
-
-  changeSortOrder(by: ArticleSortOptions) {
-    this.sortOption.set(by);
-    this.sortChanged.emit(by); // send  a message to the parent component that this happened.
-  }
+  sortOption = model<ArticleSortOptions>('oldestFirst'); // both an input and output
 }
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index 0291b9f..69e78f2 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -21,7 +21,7 @@ import { ListSortPrefs } from '../components/list-sort-prefs';
     } @else {
       <div>
         <p>You have {{ numberOfArticles() }} articles!</p>
-        <app-list-sort-prefs (sortChanged)="sortOrderChanged($event)" />
+        <app-list-sort-prefs [(sortOption)]="sortBy" />
       </div>
       <div class="grid grid-rows">
         @for (article of sortedList(); track article.id) {
@@ -48,9 +48,7 @@ export class List {
   });
 
   sortBy = signal<ArticleSortOptions>('newestFirst');
-  sortOrderChanged(by: ArticleSortOptions) {
-    this.sortBy.set(by);
-  }
+
   sortedList = computed(() => {
     const articles = this.articlesResource.value() ?? [];
     const sortBy = this.sortBy();
```

</details>

## Summary

- **Total Steps**: 3
- **Breakpoint**: articles-components
- **Git Integration**: Enabled
- **Includes Diffs**: Yes

---

*Generated by BreakPoint VS Code Extension*
