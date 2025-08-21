import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter-zone-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [],
  template: `
    <div>
      <h1 class="text-3xl text-red-400">For demonstrations, don't do this.</h1>
      <button
        [disabled]="current() === 0"
        (click)="decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ current() }}</span>
      <button (click)="increment()" class="btn btn-success">+</button>
    </div>
  `,
  styles: ``,
})
export class UiWithZone {
  current = signal(0);

  increment() {
    this.current.update((c) => c + 1);
  }
  decrement() {
    this.current.update((c) => c - 1);
  }
}
