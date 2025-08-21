import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { ApiArticles, ArticleSortOptions } from '../types';
import { resource } from '@angular/core';
import { withUserReadingList } from './user-reading-list-feature';

type ArticlesState = {
  sortingBy: ArticleSortOptions;
};
export const ArticlesStore = signalStore(
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
  withHooks({
    onInit() {
      //   setInterval(() => {
      //     store.articles.reload();
      //   }, 5000);
    },
  }),
);
