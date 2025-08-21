import { Routes } from '@angular/router';
import { Articles } from './articles';
import { Details } from './pages/details';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
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
        path: 'details/:id',
        component: Details,
      },
    ],
  },
];
