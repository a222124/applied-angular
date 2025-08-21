import { Routes } from '@angular/router';
import { Articles } from './articles';
import { Details } from './pages/details';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
import { Add } from './pages/add';
import { isLoggedInGuard } from '../shared/routing/auth-guard';
export const ARTICLES_ROUTES: Routes = [
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
        path: 'prefs',
        component: Prefs,
      },
      {
        path: 'add',
        component: Add,
        canActivate: [isLoggedInGuard],
      },
      {
        path: 'details/:id',
        component: Details,
      },
    ],
  },
];
