import { Routes } from '@angular/router';
import { Counter } from './counter';
import { Prefs } from './pages/prefs';
import { Ui } from './pages/ui';
import { CounterStore } from './stores/counter';
export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: Counter,
    providers: [CounterStore], // provide it here, create it on first inject, but then keep it in memory until the browser is closed.
    children: [
      {
        path: 'ui',
        component: Ui,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
    ],
  },
];
