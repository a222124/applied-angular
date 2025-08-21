import { Routes } from '@angular/router';
import { Articles } from './articles';
import { Details } from './pages/details';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
import { Add } from './pages/add';
import { Demo } from './pages/demo';
export const ARTICLES_RXJS_ROUTES: Routes = [
  {
    path: '',
    component: Articles,
    providers: [],
    children: [
      {
        path: '',
        component: List,
      },
      {
        path: 'demo-rxjs',
        component: Demo,
      },
      {
        path: 'prefs-rxjs',
        component: Prefs,
      },
      {
        path: 'add-rxjs',
        component: Add,
      },
      {
        path: 'details-rxjs/:id',
        component: Details,
      },
    ],
  },
];
