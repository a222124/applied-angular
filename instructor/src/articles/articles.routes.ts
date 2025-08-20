import { Routes } from '@angular/router';
import { Articles } from './articles';
import { List } from './pages/list';
import { Prefs } from './pages/prefs';
export const ARTICLES_ROUTES: Routes = [
  {
    path: '',
    component: Articles,
    children: [
      {
        path: '',
        component: List,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
    ],
  },
];
