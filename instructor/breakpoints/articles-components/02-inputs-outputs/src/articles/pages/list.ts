import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
  signal,
} from '@angular/core';
import { ApiArticleItem, ApiArticles, ArticleSortOptions } from '../types';
import { ArticleListItem } from '../components/article-list-item';
import { ListSortPrefs } from '../components/list-sort-prefs';

@Component({
  selector: 'app-articles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleListItem, ListSortPrefs],
  template: `
    @if (articlesResource.isLoading()) {
      <div class="alert alert-info">
        <span class="loading loading-dots"></span> Loading your stuff
      </div>
    } @else {
      <div>
        <p>You have {{ numberOfArticles() }} articles!</p>
        <app-list-sort-prefs (sortChanged)="sortOrderChanged($event)" />
      </div>
      <div class="grid grid-rows">
        @for (article of sortedList(); track article.id) {
          <app-article-list-item [article]="article" />
        } @empty {
          <div class="alert alert-info">
            There are no articles! Check back later!
          </div>
        }
      </div>
      @if (articlesResource.error()) {
        <div class="alert alert-error">
          There was an error. {{ articlesResource.error() }}
        </div>
      }
    }
  `,
  styles: ``,
})
export class List {
  // something new an still "experimental" in Angular, but I use it all the time.
  articlesResource = resource<ApiArticles, unknown>({
    loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
  });

  sortBy = signal<ArticleSortOptions>('newestFirst');
  sortOrderChanged(by: ArticleSortOptions) {
    this.sortBy.set(by);
  }
  sortedList = computed(() => {
    const articles = this.articlesResource.value() ?? [];
    const sortBy = this.sortBy();
    return articles.toSorted((lhs: ApiArticleItem, rhs: ApiArticleItem) => {
      const leftDate = Date.parse(lhs.added);
      const rightDate = Date.parse(rhs.added);
      if (leftDate < rightDate) {
        return sortBy === 'oldestFirst' ? 1 : -1;
      }
      if (leftDate > rightDate) {
        return sortBy === 'newestFirst' ? -1 : 1;
      }
      return 0;
    });
  });
  numberOfArticles = computed(() => {
    const articles = this.articlesResource.value();
    if (articles) {
      return articles.length;
    } else {
      return -1;
    }
  });
}
