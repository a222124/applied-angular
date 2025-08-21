import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ApiArticleItem,
  ApiArticleModel,
  ArticleCreateModel,
  ArticleSortOptions,
} from '../types';
import { withUserReadingList } from './user-reading-list-feature';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { ArticlesApi } from '../services/articles-api';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, mergeMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {
  setError,
  setIdle,
  setLoading,
  setMutating,
  withResourceState,
} from './resource-state-feature';
type ArticlesState = {
  sortingBy: ArticleSortOptions;
};
export const ArticlesStore = signalStore(
  withDevtools('articles-rxjs'),
  withState<ArticlesState>({
    sortingBy: 'oldestFirst',
  }),
  withUserReadingList(),
  withResourceState(),
  withEntities<ApiArticleItem>(),
  withMethods((store) => {
    const service = inject(ArticlesApi);
    return {
      add: rxMethod<ArticleCreateModel>(
        pipe(
          tap(() => patchState(store, setMutating())),
          mergeMap((article) =>
            service.addArticle(article).pipe(
              tapResponse({
                next: (newArticle) =>
                  patchState(store, addEntity(newArticle), setIdle()),
                error: () => setError(),
              }),
            ),
          ),
        ),
      ),
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          exhaustMap(() =>
            service.getArticles().pipe(
              tapResponse({
                next: (articles) =>
                  patchState(store, setEntities(articles), setIdle()),
                error: (e) => console.error(e),
              }),
            ),
          ),
        ),
      ),
      setSortBy: (sortingBy: ArticleSortOptions) =>
        patchState(store, { sortingBy }),
    };
  }),
  withComputed((store) => {
    return {
      links: computed(() => {
        const articles = store.entities() ?? [];
        return articles.map((article) => article.link);
      }),
      sortedList: computed(() => {
        const articles = store.entities() ?? [];
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
    onInit(store) {
      store._load(); // Load articles on initialization
    },
  }),
);
