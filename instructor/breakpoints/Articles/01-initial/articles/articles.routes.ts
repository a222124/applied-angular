import { Routes } from '@angular/router';
import { Articles } from './articles';
export const ARTICLES_ROUTES: Routes = [
  {
    path: '',
    component: Articles,
    children: [],
  },
];
