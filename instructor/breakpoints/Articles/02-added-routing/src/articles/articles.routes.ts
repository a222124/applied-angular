import { Routes } from '@angular/router';
import { Articles } from './articles';
import { List } from './pages/list';
export const ARTICLES_ROUTES: Routes = [
  {
    path: '',
    component: Articles,
    children: [
      {
        path: '',
        component: List,
      },
    ],
  },
];
