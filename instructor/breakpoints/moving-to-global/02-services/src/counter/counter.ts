import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FeatureNavLink, SectionNav } from '../shared/components/section-nav';
import { CounterStore } from './stores/counter';
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionNav],
  providers: [],
  template: ` <app-section-nav [links]="links()" sectionName="Counter">
    <p>Enjoy your counting!</p>
  </app-section-nav>`,
  styles: ``,
})
export class Counter {
  store = inject(CounterStore);

  links = signal<FeatureNavLink[]>([
    {
      label: 'Count!',
      href: 'ui',
    },
    {
      label: 'Your Preferences',
      href: 'prefs',
    },
  ]);
}
