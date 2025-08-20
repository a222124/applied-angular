import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-list-sort-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    <button
      [disabled]="sortOption() === 'oldestFirst'"
      (click)="sortOption.set('oldestFirst')"
      class="btn join-item"
    >
      Oldest First
    </button>
    <button
      [disabled]="sortOption() === 'newestFirst'"
      (click)="sortOption.set('newestFirst')"
      class="btn join-item"
    >
      Newest First
    </button>
  </div>`,
  styles: ``,
})
export class ListSortPrefs {
  sortOption = signal<'oldestFirst' | 'newestFirst'>('oldestFirst');
}
