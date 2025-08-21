import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  ApiArticleItem,
  ApiArticleModel,
  ApiArticles,
  ArticleSortOptions,
} from '../types';
import { computed, resource } from '@angular/core';
import { withUserReadingList } from './user-reading-list-feature';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
type ArticlesState = {
  sortingBy: ArticleSortOptions;
};
export const ArticlesStore = signalStore(
  withDevtools('articles'),
  withState<ArticlesState>({
    sortingBy: 'oldestFirst',
  }),
  withUserReadingList(),
  withProps(() => {
    return {
      articles: resource<ApiArticles, unknown>({
        loader: () =>
          fetch('https://fake.api.com/articles').then((r) => r.json()),
      }),
    };
  }),
  withMethods((store) => {
    return {
      setSortBy: (sortingBy: ArticleSortOptions) =>
        patchState(store, { sortingBy }),
    };
  }),
  withComputed((store) => {
    return {
      sortedList: computed(() => {
        const articles = store.articles.value() ?? [];
        const sortBy = store.sortingBy();
        const favs = store.readingListIds();
        return articles
          .toSorted((lhs: ApiArticleItem, rhs: ApiArticleItem) => {
            const leftDate = Date.parse(lhs.added);
            const rightDate = Date.parse(rhs.added);
            if (leftDate < rightDate) {
              return sortBy === 'oldestFirst' ? 1 : -1;
            }
            if (leftDate > rightDate) {
              return sortBy === 'newestFirst' ? -1 : 1;
            }
            return 0;
          })
          .map(
            (a) =>
              ({
                ...a,
                isOnReadingList: favs.some((id) => a.id === id),
              }) as ApiArticleModel,
          );
      }),
    };
  }),
  withHooks({
    onInit() {
      //   setInterval(() => {
      //     store.articles.reload();
      //   }, 5000);
    },
  }),
);
