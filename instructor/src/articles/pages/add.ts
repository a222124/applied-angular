import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import { AuthStore } from '../../shared/stores/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Add A New Article</p> `,
  styles: ``,
})
export class Add {
  authStore = inject(AuthStore);
  router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authStore.isLoggedIn() === false) {
        this.router.navigate(['articles']);
      }
    });
  }
}
