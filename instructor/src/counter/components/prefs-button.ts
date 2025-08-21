import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
} from '@angular/core';
import { ByValues, CounterStore } from '../stores/counter';

@Component({
  selector: 'app-counter-prefs-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <button
      (click)="store.setBy(byValue())"
      [disabled]="store.by() === byValue()"
      class="btn btn-primary join-item"
    >
      {{ byValue() }}
    </button>
  `,
  styles: ``,
})
export class PrefsButton {
  store = inject(CounterStore);
  byValue = input.required<ByValues>();
}
