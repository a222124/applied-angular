import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../stores/counter';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        [disabled]="store.decrementShouldBeDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ store.current() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
    </div>
    @if (store.fizzBuzz()) {
      <div class="alert alert-info">
        {{ store.fizzBuzz() }}
      </div>
    }
  `,
  styles: ``,
})
export class Ui {
  store = inject(CounterStore);
}
