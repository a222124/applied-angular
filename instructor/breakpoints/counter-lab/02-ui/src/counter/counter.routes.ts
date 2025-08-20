import { Routes } from '@angular/router';
import { Counter } from './counter';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: Counter,
    children: [],
  },
];
