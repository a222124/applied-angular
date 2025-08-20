import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ArticleSortOptions } from '../types';

type ArticlesState = {
  sortingBy: ArticleSortOptions;
};
export const ArticlesStore = signalStore(
  withState<ArticlesState>({
    sortingBy: 'oldestFirst',
  }),
  withMethods((store) => {
    return {
      setSortBy: (sortingBy: ArticleSortOptions) =>
        patchState(store, { sortingBy }),
    };
  }),
  withHooks({
    onInit: () => console.log('Created the ArticlesStore'),
    onDestroy: () => console.log('Destroying the articles store'),
  }),
);
