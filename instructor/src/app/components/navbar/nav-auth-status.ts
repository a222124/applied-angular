import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { AuthStore } from '../../../shared/stores/auth';

@Component({
  selector: 'app-nav-auth-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` @if (store.isLoggedIn()) {
      <button (click)="store.logOut()" class="btn btn-ghost">
        Logout {{ store.userName() }}
      </button>
    } @else {
      <button (click)="store.logIn()" class="btn btn-ghost">Login</button>
    }`,
  styles: ``,
})
export class NavAuthStatus {
  store = inject(AuthStore);
}
