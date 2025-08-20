# lifting-state-articles - Change Log

Generated on: 8/19/2025

## Overview

This document summarizes the changes made in each step of the "lifting-state-articles" breakpoint.

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

## 02-created-store

### Files Modified (9 files)

- package-lock.json
- package.json

#### notes/
- 07-component-communication.excalidraw

#### src\articles/
- articles.routes.ts
- articles.ts

#### src\articles\components/
- list-sort-prefs.ts

#### src\articles\pages/
- list.ts
- prefs.ts

#### src\articles\stores/
- articles-store.ts

*This step contains the changes for: created store*

### Git Changes

<details>
<summary>Show/Hide Diff for 02-created-store</summary>

```diff
diff --git a/notes/07-component-communication.excalidraw b/notes/07-component-communication.excalidraw
index b4e8ce9..b529f8c 100644
--- a/notes/07-component-communication.excalidraw
+++ b/notes/07-component-communication.excalidraw
@@ -287,6 +287,598 @@
       "originalText": "sortBy()",
       "autoResize": true,
       "lineHeight": 1.25
+    },
+    {
+      "id": "Cf0g4iUzoJZLnD_KY8m9E",
+      "type": "rectangle",
+      "x": 297,
+      "y": 776,
+      "width": 482,
+      "height": 358,
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
+      "roundness": {
+        "type": 3
+      },
+      "seed": 1706902417,
+      "version": 20,
+      "versionNonce": 1227305553,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627287738,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "QJYjfRIG_elNsbh3TXk_x",
+      "type": "text",
+      "x": 311,
+      "y": 737,
+      "width": 37.65995788574219,
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
+      "index": "a9",
+      "roundness": null,
+      "seed": 2022281745,
+      "version": 6,
+      "versionNonce": 1721182065,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627292198,
+      "link": null,
+      "locked": false,
+      "text": "List",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "List",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "MQlUfH9FpFSHFYRq-HhjB",
+      "type": "rectangle",
+      "x": 338,
+      "y": 800,
+      "width": 377,
+      "height": 52,
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
+      "index": "aA",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 890107583,
+      "version": 24,
+      "versionNonce": 518128863,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "id": "PtF4bXPFinJrJJfyTnzjE",
+          "type": "text"
+        },
+        {
+          "id": "mSF401EjiIGCAJIE8BMqp",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755627452866,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "PtF4bXPFinJrJJfyTnzjE",
+      "type": "text",
+      "x": 491.0800247192383,
+      "y": 813.5,
+      "width": 70.83995056152344,
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
+      "index": "aB",
+      "roundness": null,
+      "seed": 717145823,
+      "version": 12,
+      "versionNonce": 308423249,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627315766,
+      "link": null,
+      "locked": false,
+      "text": "Sorting",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "center",
+      "verticalAlign": "middle",
+      "containerId": "MQlUfH9FpFSHFYRq-HhjB",
+      "originalText": "Sorting",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "NZsRRTk20oScov1Kkhqer",
+      "type": "rectangle",
+      "x": 340,
+      "y": 878,
+      "width": 401,
+      "height": 211,
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
+      "index": "aC",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 1369394943,
+      "version": 15,
+      "versionNonce": 1128529297,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627302780,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "tC4A2X_BvLeohybcSNn92",
+      "type": "rectangle",
+      "x": 905,
+      "y": 764,
+      "width": 476,
+      "height": 364,
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
+      "index": "aD",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 1932183583,
+      "version": 16,
+      "versionNonce": 1389984031,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627308047,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "dCrKN6-iNiBrROJWTfKAX",
+      "type": "text",
+      "x": 913,
+      "y": 717,
+      "width": 53.33995056152344,
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
+      "index": "aE",
+      "roundness": null,
+      "seed": 368508255,
+      "version": 7,
+      "versionNonce": 67578399,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627311286,
+      "link": null,
+      "locked": false,
+      "text": "Prefs",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "Prefs",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "eOzIDq65UsdARrjhDcn8X",
+      "type": "rectangle",
+      "x": 958,
+      "y": 789,
+      "width": 377,
+      "height": 52,
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
+      "index": "aF",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 2065483871,
+      "version": 66,
+      "versionNonce": 1462226335,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "type": "text",
+          "id": "Nl39AmNGMA6Dp-B12tHS0"
+        },
+        {
+          "id": "4XOOxi7Ewle3Whc_7BZkV",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755627440223,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "Nl39AmNGMA6Dp-B12tHS0",
+      "type": "text",
+      "x": 1111.0800247192383,
+      "y": 802.5,
+      "width": 70.83995056152344,
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
+      "index": "aG",
+      "roundness": null,
+      "seed": 519155103,
+      "version": 55,
+      "versionNonce": 354900543,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627317827,
+      "link": null,
+      "locked": false,
+      "text": "Sorting",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "center",
+      "verticalAlign": "middle",
+      "containerId": "eOzIDq65UsdARrjhDcn8X",
+      "originalText": "Sorting",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "DbIsZpQMYeSm8UmNjRz3u",
+      "type": "rectangle",
+      "x": 713,
+      "y": 584,
+      "width": 233,
+      "height": 110,
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
+      "index": "aH",
+      "roundness": {
+        "type": 3
+      },
+      "seed": 584521343,
+      "version": 12,
+      "versionNonce": 1605918879,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "id": "4XOOxi7Ewle3Whc_7BZkV",
+          "type": "arrow"
+        },
+        {
+          "id": "mSF401EjiIGCAJIE8BMqp",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755627452866,
+      "link": null,
+      "locked": false
+    },
+    {
+      "id": "QCZMncrUGE0S_71qW762I",
+      "type": "text",
+      "x": 761,
+      "y": 643,
+      "width": 90.95993041992188,
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
+      "index": "aI",
+      "roundness": null,
+      "seed": 1523067743,
+      "version": 12,
+      "versionNonce": 1189887633,
+      "isDeleted": false,
+      "boundElements": [
+        {
+          "id": "_vi-pDnC3S9MIz4UJEfwP",
+          "type": "arrow"
+        }
+      ],
+      "updated": 1755627445658,
+      "link": null,
+      "locked": false,
+      "text": "sortingby",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "sortingby",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "JWuZHP8SgjdgFCkwI2_Np",
+      "type": "text",
+      "x": 985,
+      "y": 580,
+      "width": 495.7796325683594,
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
+      "index": "aJ",
+      "roundness": null,
+      "seed": 201642609,
+      "version": 90,
+      "versionNonce": 1099886929,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627429732,
+      "link": null,
+      "locked": false,
+      "text": "\"Service\" - services own some data (state) and all \nthe process involved in that state. ",
+      "fontSize": 20,
+      "fontFamily": 5,
+      "textAlign": "left",
+      "verticalAlign": "top",
+      "containerId": null,
+      "originalText": "\"Service\" - services own some data (state) and all \nthe process involved in that state. ",
+      "autoResize": true,
+      "lineHeight": 1.25
+    },
+    {
+      "id": "4XOOxi7Ewle3Whc_7BZkV",
+      "type": "arrow",
+      "x": 922,
+      "y": 661,
+      "width": 176,
+      "height": 136,
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
+      "index": "aK",
+      "roundness": {
+        "type": 2
+      },
+      "seed": 1819994207,
+      "version": 15,
+      "versionNonce": 1438700927,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627440223,
+      "link": null,
+      "locked": false,
+      "points": [
+        [
+          0,
+          0
+        ],
+        [
+          176,
+          136
+        ]
+      ],
+      "lastCommittedPoint": null,
+      "startBinding": {
+        "elementId": "DbIsZpQMYeSm8UmNjRz3u",
+        "focus": -0.3411690957530157,
+        "gap": 24
+      },
+      "endBinding": {
+        "elementId": "eOzIDq65UsdARrjhDcn8X",
+        "focus": -0.11346484840460734,
+        "gap": 8
+      },
+      "startArrowhead": null,
+      "endArrowhead": "arrow",
+      "elbowed": false
+    },
+    {
+      "id": "_vi-pDnC3S9MIz4UJEfwP",
+      "type": "arrow",
+      "x": 1065,
+      "y": 823,
+      "width": 210,
+      "height": 164,
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
+      "index": "aL",
+      "roundness": {
+        "type": 2
+      },
+      "seed": 974814641,
+      "version": 16,
+      "versionNonce": 1064107185,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627445658,
+      "link": null,
+      "locked": false,
+      "points": [
+        [
+          0,
+          0
+        ],
+        [
+          -210,
+          -164
+        ]
+      ],
+      "lastCommittedPoint": null,
+      "startBinding": null,
+      "endBinding": {
+        "elementId": "QCZMncrUGE0S_71qW762I",
+        "focus": -0.7162326792175387,
+        "gap": 3.040069580078125
+      },
+      "startArrowhead": null,
+      "endArrowhead": "arrow",
+      "elbowed": false
+    },
+    {
+      "id": "mSF401EjiIGCAJIE8BMqp",
+      "type": "arrow",
+      "x": 748,
+      "y": 698,
+      "width": 122,
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
+      "index": "aM",
+      "roundness": {
+        "type": 2
+      },
+      "seed": 1493898207,
+      "version": 11,
+      "versionNonce": 1279325375,
+      "isDeleted": false,
+      "boundElements": null,
+      "updated": 1755627452866,
+      "link": null,
+      "locked": false,
+      "points": [
+        [
+          0,
+          0
+        ],
+        [
+          -122,
+          104
+        ]
+      ],
+      "lastCommittedPoint": null,
+      "startBinding": {
+        "elementId": "DbIsZpQMYeSm8UmNjRz3u",
+        "focus": 0.06788484011473349,
+        "gap": 4
+      },
+      "endBinding": {
+        "elementId": "MQlUfH9FpFSHFYRq-HhjB",
+        "focus": 0.32578152441166164,
+        "gap": 2
+      },
+      "startArrowhead": null,
+      "endArrowhead": "arrow",
+      "elbowed": false
     }
   ],
   "appState": {
diff --git a/package-lock.json b/package-lock.json
index 90502a1..f1fd639 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -16,6 +16,7 @@
         "@angular/platform-browser": "^20.1.0",
         "@angular/platform-browser-dynamic": "^20.1.0",
         "@angular/router": "^20.1.0",
+        "@ngrx/signals": "^20.0.0",
         "rxjs": "~7.8.0",
         "tslib": "^2.3.0",
         "zone.js": "~0.15.0"
@@ -2684,6 +2685,24 @@
         "node": ">= 10"
       }
     },
+    "node_modules/@ngrx/signals": {
+      "version": "20.0.0",
+      "resolved": "https://registry.npmjs.org/@ngrx/signals/-/signals-20.0.0.tgz",
+      "integrity": "sha512-ALz9dzu4tkL3QtgtkyHqvO14Od3tY/febpsqS6LaUgIxF8jFtmAneo0VgaGB2O7KamMwrwF005lpZjl/zeZghA==",
+      "license": "MIT",
+      "dependencies": {
+        "tslib": "^2.3.0"
+      },
+      "peerDependencies": {
+        "@angular/core": "^20.0.0",
+        "rxjs": "^6.5.3 || ^7.4.0"
+      },
+      "peerDependenciesMeta": {
+        "rxjs": {
+          "optional": true
+        }
+      }
+    },
     "node_modules/@nodelib/fs.scandir": {
       "version": "2.1.5",
       "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
diff --git a/package.json b/package.json
index b48f9a8..9631a78 100644
--- a/package.json
+++ b/package.json
@@ -20,6 +20,7 @@
     "@angular/platform-browser": "^20.1.0",
     "@angular/platform-browser-dynamic": "^20.1.0",
     "@angular/router": "^20.1.0",
+    "@ngrx/signals": "^20.0.0",
     "rxjs": "~7.8.0",
     "tslib": "^2.3.0",
     "zone.js": "~0.15.0"
diff --git a/src/articles/articles.routes.ts b/src/articles/articles.routes.ts
index 28a49f4..f4dc3f3 100644
--- a/src/articles/articles.routes.ts
+++ b/src/articles/articles.routes.ts
@@ -1,6 +1,7 @@
 import { Routes } from '@angular/router';
 import { Articles } from './articles';
 import { List } from './pages/list';
+import { Prefs } from './pages/prefs';
 export const ARTICLES_ROUTES: Routes = [
   {
     path: '',
@@ -10,6 +11,10 @@ export const ARTICLES_ROUTES: Routes = [
         path: '',
         component: List,
       },
+      {
+        path: 'prefs',
+        component: Prefs,
+      },
     ],
   },
 ];
diff --git a/src/articles/articles.ts b/src/articles/articles.ts
index 3b628b8..14ea555 100644
--- a/src/articles/articles.ts
+++ b/src/articles/articles.ts
@@ -1,11 +1,20 @@
 import { Component, ChangeDetectionStrategy } from '@angular/core';
-import { RouterOutlet } from '@angular/router';
+import { RouterLink, RouterOutlet } from '@angular/router';
+import { ArticlesStore } from './stores/articles-store';
 
 @Component({
   selector: 'app-articles',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [RouterOutlet],
-  template: ` <router-outlet /> `,
+  imports: [RouterOutlet, RouterLink],
+  providers: [ArticlesStore],
+  template: `
+    <div class="flex flex-row gap-4">
+      <a routerLink="/articles" class="btn btn-sm btn-primary">List</a>
+      <a routerLink="prefs" class="btn btn-sm btn-primary">Prefs</a>
+    </div>
+
+    <router-outlet />
+  `,
   styles: ``,
 })
 export class Articles {}
diff --git a/src/articles/components/list-sort-prefs.ts b/src/articles/components/list-sort-prefs.ts
index bdc0c6c..925e8f7 100644
--- a/src/articles/components/list-sort-prefs.ts
+++ b/src/articles/components/list-sort-prefs.ts
@@ -1,5 +1,5 @@
-import { ChangeDetectionStrategy, Component, model } from '@angular/core';
-import { ArticleSortOptions } from '../types';
+import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
+import { ArticlesStore } from '../stores/articles-store';
 
 @Component({
   selector: 'app-list-sort-prefs',
@@ -7,15 +7,15 @@ import { ArticleSortOptions } from '../types';
   imports: [],
   template: ` <div class="join">
     <button
-      [disabled]="sortOption() === 'oldestFirst'"
-      (click)="sortOption.set('oldestFirst')"
+      [disabled]="store.sortingBy() === 'oldestFirst'"
+      (click)="store.setSortBy('oldestFirst')"
       class="btn join-item"
     >
       Oldest First
     </button>
     <button
-      [disabled]="sortOption() === 'newestFirst'"
-      (click)="sortOption.set('newestFirst')"
+      [disabled]="store.sortingBy() === 'newestFirst'"
+      (click)="store.setSortBy('newestFirst')"
       class="btn join-item"
     >
       Newest First
@@ -24,5 +24,7 @@ import { ArticleSortOptions } from '../types';
   styles: ``,
 })
 export class ListSortPrefs {
-  sortOption = model<ArticleSortOptions>('oldestFirst'); // both an input and output [()] from the parent to "share" a signal.
+  store = inject(ArticlesStore);
+  //    constructor(private store:ArticlesStore) {}
+  // sortOption = model<ArticleSortOptions>('oldestFirst'); // both an input and output [()] from the parent to "share" a signal.
 }
diff --git a/src/articles/pages/list.ts b/src/articles/pages/list.ts
index 69e78f2..68f2772 100644
--- a/src/articles/pages/list.ts
+++ b/src/articles/pages/list.ts
@@ -2,12 +2,14 @@ import {
   ChangeDetectionStrategy,
   Component,
   computed,
+  inject,
   resource,
   signal,
 } from '@angular/core';
 import { ApiArticleItem, ApiArticles, ArticleSortOptions } from '../types';
 import { ArticleListItem } from '../components/article-list-item';
 import { ListSortPrefs } from '../components/list-sort-prefs';
+import { ArticlesStore } from '../stores/articles-store';
 
 @Component({
   selector: 'app-articles-list',
@@ -21,7 +23,7 @@ import { ListSortPrefs } from '../components/list-sort-prefs';
     } @else {
       <div>
         <p>You have {{ numberOfArticles() }} articles!</p>
-        <app-list-sort-prefs [(sortOption)]="sortBy" />
+        <app-list-sort-prefs />
       </div>
       <div class="grid grid-rows">
         @for (article of sortedList(); track article.id) {
@@ -47,11 +49,11 @@ export class List {
     loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
   });
 
-  sortBy = signal<ArticleSortOptions>('newestFirst');
+  store = inject(ArticlesStore);
 
   sortedList = computed(() => {
     const articles = this.articlesResource.value() ?? [];
-    const sortBy = this.sortBy();
+    const sortBy = this.store.sortingBy();
     return articles.toSorted((lhs: ApiArticleItem, rhs: ApiArticleItem) => {
       const leftDate = Date.parse(lhs.added);
       const rightDate = Date.parse(rhs.added);
diff --git a/src/articles/pages/prefs.ts b/src/articles/pages/prefs.ts
new file mode 100644
index 0000000..ad2051d
--- /dev/null
+++ b/src/articles/pages/prefs.ts
@@ -0,0 +1,15 @@
+import { Component, ChangeDetectionStrategy } from '@angular/core';
+import { ListSortPrefs } from '../components/list-sort-prefs';
+
+@Component({
+  selector: 'app-articles-prefs',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [ListSortPrefs],
+  template: `
+    <p>Preferences</p>
+
+    <app-list-sort-prefs />
+  `,
+  styles: ``,
+})
+export class Prefs {}
diff --git a/src/articles/stores/articles-store.ts b/src/articles/stores/articles-store.ts
new file mode 100644
index 0000000..501ad97
--- /dev/null
+++ b/src/articles/stores/articles-store.ts
@@ -0,0 +1,27 @@
+import {
+  patchState,
+  signalStore,
+  withHooks,
+  withMethods,
+  withState,
+} from '@ngrx/signals';
+import { ArticleSortOptions } from '../types';
+
+type ArticlesState = {
+  sortingBy: ArticleSortOptions;
+};
+export const ArticlesStore = signalStore(
+  withState<ArticlesState>({
+    sortingBy: 'oldestFirst',
+  }),
+  withMethods((store) => {
+    return {
+      setSortBy: (sortingBy: ArticleSortOptions) =>
+        patchState(store, { sortingBy }),
+    };
+  }),
+  withHooks({
+    onInit: () => console.log('Created the ArticlesStore'),
+    onDestroy: () => console.log('Destroying the articles store'),
+  }),
+);
```

</details>

## Summary

- **Total Steps**: 2
- **Breakpoint**: lifting-state-articles
- **Git Integration**: Enabled
- **Includes Diffs**: Yes

---

*Generated by BreakPoint VS Code Extension*
