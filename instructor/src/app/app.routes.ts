import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { About } from './pages/about';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'about',

    component: About,
  },
  {
    path: 'demos',
    loadChildren: () =>
      import('../demos/demos.routes').then((r) => r.DEMO_ROUTES),
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('../counter/counter.routes').then((r) => r.COUNTER_ROUTES),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('../articles/articles.routes').then((a) => a.ARTICLES_ROUTES),
  },
  {
    path: 'articles-rxjs',
    loadChildren: () =>
      import('../articles-rxjs/articles.routes').then(
        (a) => a.ARTICLES_RXJS_ROUTES,
      ),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('../books/books.routes').then((r) => r.BOOKS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
