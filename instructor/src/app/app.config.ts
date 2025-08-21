import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthStore } from '../shared/stores/auth';

// this is the "global"
export const appConfig: ApplicationConfig = {
  providers: [
    AuthStore,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(), // if I have a route parameter and matching -named input, just do it for me.
      withPreloading(PreloadAllModules),
      withViewTransitions(),
    ),
    provideHttpClient(withFetch()),
  ],
};
