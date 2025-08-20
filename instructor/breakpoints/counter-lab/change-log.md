# counter-lab - Change Log

Generated on: 8/19/2025

## Overview

This document summarizes the changes made in each step of the "counter-lab" breakpoint.

## 01-initial

### Files Modified (30 files)

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
- types.ts

#### articles\components/
- article-list-item.ts
- list-sort-prefs.ts

#### articles\pages/
- list.ts
- prefs.ts

#### articles\stores/
- articles-store.ts

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

## 02-ui

### Files Modified (4 files)

#### src\app/
- app.routes.ts

#### src\app\components\navbar/
- navbar.ts

#### src\counter/
- counter.routes.ts
- counter.ts

*This step contains the changes for: ui*

### Git Changes

<details>
<summary>Show/Hide Diff for 02-ui</summary>

```diff
diff --git a/src/app/app.routes.ts b/src/app/app.routes.ts
index 931d9dd..5b3581d 100644
--- a/src/app/app.routes.ts
+++ b/src/app/app.routes.ts
@@ -16,6 +16,11 @@ export const routes: Routes = [
     loadChildren: () =>
       import('../demos/demos.routes').then((r) => r.DEMO_ROUTES),
   },
+  {
+    path: 'counter',
+    loadChildren: () =>
+      import('../counter/counter.routes').then((r) => r.COUNTER_ROUTES),
+  },
   {
     path: 'articles',
     loadChildren: () =>
diff --git a/src/app/components/navbar/navbar.ts b/src/app/components/navbar/navbar.ts
index 17ae651..87e1fa7 100644
--- a/src/app/components/navbar/navbar.ts
+++ b/src/app/components/navbar/navbar.ts
@@ -65,5 +65,9 @@ export class Navbar {
       text: 'Articles',
       href: '/articles',
     },
+    {
+      text: 'Counter',
+      href: '/counter',
+    },
   ]);
 }
diff --git a/src/counter/counter.routes.ts b/src/counter/counter.routes.ts
new file mode 100644
index 0000000..a7e4b40
--- /dev/null
+++ b/src/counter/counter.routes.ts
@@ -0,0 +1,9 @@
+import { Routes } from '@angular/router';
+import { Counter } from './counter';
+export const COUNTER_ROUTES: Routes = [
+  {
+    path: '',
+    component: Counter,
+    children: [],
+  },
+];
diff --git a/src/counter/counter.ts b/src/counter/counter.ts
new file mode 100644
index 0000000..cbdc24a
--- /dev/null
+++ b/src/counter/counter.ts
@@ -0,0 +1,10 @@
+import { Component, ChangeDetectionStrategy } from '@angular/core';
+
+@Component({
+  selector: 'app-counter',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [],
+  template: ` <p>Counter Goes Here</p> `,
+  styles: ``,
+})
+export class Counter {}
```

</details>

## 03-counting

### Files Modified (4 files)

#### src\counter/
- counter.routes.ts
- counter.ts

#### src\counter\pages/
- prefs.ts
- ui.ts

*This step contains the changes for: counting*

### Git Changes

<details>
<summary>Show/Hide Diff for 03-counting</summary>

```diff
diff --git a/src/counter/counter.routes.ts b/src/counter/counter.routes.ts
index a7e4b40..f60aae0 100644
--- a/src/counter/counter.routes.ts
+++ b/src/counter/counter.routes.ts
@@ -1,9 +1,20 @@
 import { Routes } from '@angular/router';
 import { Counter } from './counter';
+import { Ui } from './pages/ui';
+import { Prefs } from './pages/prefs';
 export const COUNTER_ROUTES: Routes = [
   {
     path: '',
     component: Counter,
-    children: [],
+    children: [
+      {
+        path: 'ui',
+        component: Ui,
+      },
+      {
+        path: 'prefs',
+        component: Prefs,
+      },
+    ],
   },
 ];
diff --git a/src/counter/counter.ts b/src/counter/counter.ts
index cbdc24a..6dbef01 100644
--- a/src/counter/counter.ts
+++ b/src/counter/counter.ts
@@ -1,10 +1,29 @@
 import { Component, ChangeDetectionStrategy } from '@angular/core';
+import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
 
 @Component({
   selector: 'app-counter',
   changeDetection: ChangeDetectionStrategy.OnPush,
-  imports: [],
-  template: ` <p>Counter Goes Here</p> `,
+  imports: [RouterLink, RouterLinkActive, RouterOutlet],
+  template: `
+    <div class="flex flex-row gap-4">
+      <a
+        routerLink="ui"
+        [routerLinkActive]="['underline', 'font-bold']"
+        class="btn btn-sm btn-primary "
+        >Count!</a
+      >
+      <a
+        routerLink="prefs"
+        [routerLinkActive]="['underline', 'font-bold']"
+        class="btn btn-sm btn-primary"
+        >Prefs</a
+      >
+    </div>
+    <div class="m-4 p-8">
+      <router-outlet />
+    </div>
+  `,
   styles: ``,
 })
 export class Counter {}
diff --git a/src/counter/pages/prefs.ts b/src/counter/pages/prefs.ts
new file mode 100644
index 0000000..a5daad0
--- /dev/null
+++ b/src/counter/pages/prefs.ts
@@ -0,0 +1,10 @@
+import { Component, ChangeDetectionStrategy } from '@angular/core';
+
+@Component({
+  selector: 'app-counter-prefs',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [],
+  template: ` <p>Prefs Will Go Here</p> `,
+  styles: ``,
+})
+export class Prefs {}
diff --git a/src/counter/pages/ui.ts b/src/counter/pages/ui.ts
new file mode 100644
index 0000000..8dd4de5
--- /dev/null
+++ b/src/counter/pages/ui.ts
@@ -0,0 +1,16 @@
+import { Component, ChangeDetectionStrategy } from '@angular/core';
+
+@Component({
+  selector: 'app-counter-ui',
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  imports: [],
+  template: `
+    <div>
+      <button class="btn btn-primary">-</button>
+      <span>0</span>
+      <button class="btn btn-primary">+</button>
+    </div>
+  `,
+  styles: ``,
+})
+export class Ui {}
```

</details>

## 04-done

### Files Modified (4 files)

#### src\counter/
- counter.ts

#### src\counter\pages/
- prefs.ts
- ui.ts

#### src\counter\stores/
- counter.ts

*This step contains the changes for: done*

### Git Changes

<details>
<summary>Show/Hide Diff for 04-done</summary>

```diff
diff --git a/src/counter/counter.ts b/src/counter/counter.ts
index 6dbef01..a0d86bd 100644
--- a/src/counter/counter.ts
+++ b/src/counter/counter.ts
@@ -1,10 +1,12 @@
 import { Component, ChangeDetectionStrategy } from '@angular/core';
 import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
+import { CounterStore } from './stores/counter';
 
 @Component({
   selector: 'app-counter',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterLink, RouterLinkActive, RouterOutlet],
+  providers: [CounterStore],
   template: `
     <div class="flex flex-row gap-4">
       <a
diff --git a/src/counter/pages/prefs.ts b/src/counter/pages/prefs.ts
index a5daad0..cd1e1aa 100644
--- a/src/counter/pages/prefs.ts
+++ b/src/counter/pages/prefs.ts
@@ -1,10 +1,42 @@
-import { Component, ChangeDetectionStrategy } from '@angular/core';
+import {
+  Component,
+  ChangeDetectionStrategy,
+  signal,
+  inject,
+} from '@angular/core';
+import { CounterStore } from '../stores/counter';
 
 @Component({
   selector: 'app-counter-prefs',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [],
-  template: ` <p>Prefs Will Go Here</p> `,
+  template: `
+    <div class="join">
+      <button
+        (click)="store.setBy(1)"
+        [disabled]="store.by() === 1"
+        class="btn btn-success join-item"
+      >
+        1
+      </button>
+      <button
+        (click)="store.setBy(3)"
+        [disabled]="store.by() === 3"
+        class="btn btn-success join-item"
+      >
+        3
+      </button>
+      <button
+        (click)="store.setBy(5)"
+        [disabled]="store.by() === 5"
+        class="btn btn-success join-item"
+      >
+        5
+      </button>
+    </div>
+  `,
   styles: ``,
 })
-export class Prefs {}
+export class Prefs {
+  store = inject(CounterStore);
+}
diff --git a/src/counter/pages/ui.ts b/src/counter/pages/ui.ts
index 8dd4de5..1d633a9 100644
--- a/src/counter/pages/ui.ts
+++ b/src/counter/pages/ui.ts
@@ -1,4 +1,11 @@
-import { Component, ChangeDetectionStrategy } from '@angular/core';
+import {
+  Component,
+  ChangeDetectionStrategy,
+  signal,
+  computed,
+  inject,
+} from '@angular/core';
+import { CounterStore } from '../stores/counter';
 
 @Component({
   selector: 'app-counter-ui',
@@ -6,11 +13,24 @@ import { Component, ChangeDetectionStrategy } from '@angular/core';
   imports: [],
   template: `
     <div>
-      <button class="btn btn-primary">-</button>
-      <span>0</span>
-      <button class="btn btn-primary">+</button>
+      <button
+        [disabled]="store.decrementShouldBeDisabled()"
+        (click)="store.decrement()"
+        class="btn btn-primary"
+      >
+        -
+      </button>
+      <span>{{ store.current() }}</span>
+      <button (click)="store.increment()" class="btn btn-primary">+</button>
     </div>
+    @if (store.fizzBuzz()) {
+      <div class="alert alert-info">
+        {{ store.fizzBuzz() }}
+      </div>
+    }
   `,
   styles: ``,
 })
-export class Ui {}
+export class Ui {
+  store = inject(CounterStore);
+}
diff --git a/src/counter/stores/counter.ts b/src/counter/stores/counter.ts
new file mode 100644
index 0000000..98e0c3e
--- /dev/null
+++ b/src/counter/stores/counter.ts
@@ -0,0 +1,65 @@
+import { computed } from '@angular/core';
+import {
+  patchState,
+  signalStore,
+  watchState,
+  withComputed,
+  withHooks,
+  withMethods,
+  withState,
+} from '@ngrx/signals';
+
+type ByValues = 1 | 3 | 5;
+type CounterState = {
+  by: ByValues;
+  current: number;
+};
+
+export const CounterStore = signalStore(
+  withState<CounterState>({
+    by: 1,
+    current: 0,
+  }),
+  withMethods((store) => {
+    return {
+      setBy: (by: ByValues) => patchState(store, { by }),
+      increment: () =>
+        patchState(store, { current: store.current() + store.by() }),
+      decrement: () =>
+        patchState(store, { current: store.current() - store.by() }),
+    };
+  }),
+  withComputed((store) => {
+    return {
+      decrementShouldBeDisabled: computed(
+        () => store.current() - store.by() < 0,
+      ),
+      fizzBuzz: computed(() => {
+        const current = store.current();
+        if (current === 0) return '';
+        if (current % 3 === 0 && current % 5 === 0) {
+          return 'FizzBuzz';
+        }
+        if (current % 3 === 0) {
+          return 'Fizz';
+        }
+        if (current % 5 === 0) {
+          return 'Buzz';
+        }
+        return '';
+      }),
+    };
+  }),
+  withHooks({
+    onInit(store) {
+      const savedState = localStorage.getItem('counter-state');
+      if (savedState) {
+        const actualState = JSON.parse(savedState) as unknown as CounterState;
+        patchState(store, actualState);
+      }
+      watchState(store, (state) => {
+        localStorage.setItem('counter-state', JSON.stringify(state));
+      });
+    },
+  }),
+);
```

</details>

## Summary

- **Total Steps**: 4
- **Breakpoint**: counter-lab
- **Git Integration**: Enabled
- **Includes Diffs**: Yes

---

*Generated by BreakPoint VS Code Extension*
