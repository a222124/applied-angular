import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ListSortPrefs } from '../components/list-sort-prefs';

@Component({
  selector: 'app-articles-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListSortPrefs],
  template: `
    <p>Preferences</p>

    <app-list-sort-prefs />
  `,
  styles: ``,
})
export class Prefs {}
