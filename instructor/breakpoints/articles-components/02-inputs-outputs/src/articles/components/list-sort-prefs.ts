import {
  Component,
  ChangeDetectionStrategy,
  signal,
  output,
} from '@angular/core';
import { ArticleSortOptions } from '../types';

@Component({
  selector: 'app-list-sort-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    <button
      [disabled]="sortOption() === 'oldestFirst'"
      (click)="changeSortOrder('oldestFirst')"
      class="btn join-item"
    >
      Oldest First
    </button>
    <button
      [disabled]="sortOption() === 'newestFirst'"
      (click)="changeSortOrder('newestFirst')"
      class="btn join-item"
    >
      Newest First
    </button>
  </div>`,
  styles: ``,
})
export class ListSortPrefs {
  sortOption = signal<ArticleSortOptions>('oldestFirst');
  sortChanged = output<ArticleSortOptions>();

  changeSortOrder(by: ArticleSortOptions) {
    this.sortOption.set(by);
    this.sortChanged.emit(by); // send  a message to the parent component that this happened.
  }
}
