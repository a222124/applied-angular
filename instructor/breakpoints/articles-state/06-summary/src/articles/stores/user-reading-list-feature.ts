import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

type UserReadingListState = {
  readingListIds: string[];
};
export function withUserReadingList() {
  return signalStoreFeature(
    withState<UserReadingListState>({
      readingListIds: [],
    }),
    withMethods((store) => {
      return {
        addToReadingList: (id: string) =>
          patchState(store, {
            readingListIds: [id, ...store.readingListIds()],
          }),
        removeFromReadingList: (id: string) =>
          patchState(store, {
            readingListIds: store.readingListIds().filter((r) => r !== id),
          }),
      };
    }),
  );
}
