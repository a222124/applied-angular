import { Routes } from '@angular/router';
import { Demos } from './demos';
import { BasicSignals } from './pages/basic-signals';
import { AdvancedSignals } from './pages/advanced-signals';
export const DEMO_ROUTES: Routes = [
  {
    path: '', // http://localhost:4200/demos
    component: Demos,
    children: [
      {
        path: 'basic-signals', // http://localhost:4200/demos/basic-signals
        component: BasicSignals,
      },
      {
        path: 'advanced-signals', // http://localhost:4200/demos/advanced-signals
        component: AdvancedSignals,
      },
    ],
  },
];
