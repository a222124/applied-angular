import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ListSortPrefs } from '../components/list-sort-prefs';

@Component({
  selector: 'app-articles-rxjs-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListSortPrefs],
  template: `
    <p>Preferences</p>

    <app-articles-rxjs-list-sort-prefs />
  `,
  styles: ``,
})
export class Prefs {}
