import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../stores/counter';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [],
  template: `
    <div class="join">
      <button
        (click)="store.setBy(1)"
        [disabled]="store.by() === 1"
        class="btn btn-success join-item"
      >
        1
      </button>
      <button
        (click)="store.setBy(3)"
        [disabled]="store.by() === 3"
        class="btn btn-success join-item"
      >
        3
      </button>
      <button
        (click)="store.setBy(5)"
        [disabled]="store.by() === 5"
        class="btn btn-success join-item"
      >
        5
      </button>
    </div>
  `,
  styles: ``,
})
export class Prefs {
  store = inject(CounterStore);
}
