import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticlesStore } from '../stores/articles-store';

@Component({
  selector: 'app-list-sort-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    <button
      [disabled]="store.sortingBy() === 'oldestFirst'"
      (click)="store.setSortBy('oldestFirst')"
      class="btn join-item"
    >
      Oldest First
    </button>
    <button
      [disabled]="store.sortingBy() === 'newestFirst'"
      (click)="store.setSortBy('newestFirst')"
      class="btn join-item"
    >
      Newest First
    </button>
  </div>`,
  styles: ``,
})
export class ListSortPrefs {
  store = inject(ArticlesStore);
  //    constructor(private store:ArticlesStore) {}
  // sortOption = model<ArticleSortOptions>('oldestFirst'); // both an input and output [()] from the parent to "share" a signal.
}
