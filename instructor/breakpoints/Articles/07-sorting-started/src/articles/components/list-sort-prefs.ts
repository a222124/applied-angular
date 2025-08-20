import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-list-sort-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <fieldset
      class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4"
    >
      <legend class="fieldset-legend">Sorting Options</legend>
      <label class="label">
        <input type="checkbox" checked="checked" class="toggle" />
        @switch (sortOption()) {
          @case ('newestFirst') {
            <p>Oldest First</p>
          }
          @case ('oldestFirst') {
            <p>Newest First</p>
          }
        }
      </label>
    </fieldset>
  `,
  styles: ``,
})
export class ListSortPrefs {
  sortOption = signal<'oldestFirst' | 'newestFirst'>('oldestFirst');
}
