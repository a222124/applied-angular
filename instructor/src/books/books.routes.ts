import { Routes } from '@angular/router';
import { Books } from './books';
import { List } from './pages/list';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: Books,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
