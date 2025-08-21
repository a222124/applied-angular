import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

const BY_VALUES = [1, 3, 5, 42, 99] as const;

export type ByValues = (typeof BY_VALUES)[number];
type CounterState = {
  by: ByValues;
  current: number;
};

export const CounterStore = signalStore(
  withProps(() => ({
    byValues: BY_VALUES,
  })),
  withState<CounterState>({
    by: 1,
    current: 0,
  }),
  withMethods((store) => {
    return {
      setBy: (by: ByValues) => patchState(store, { by }),
      increment: () =>
        patchState(store, { current: store.current() + store.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.by() }),
    };
  }),
  withComputed((store) => {
    return {
      decrementShouldBeDisabled: computed(
        () => store.current() - store.by() < 0,
      ),
      fizzBuzz: computed(() => {
        const current = store.current();
        if (current === 0) return '';
        if (current % 3 === 0 && current % 5 === 0) {
          return 'FizzBuzz';
        }
        if (current % 3 === 0) {
          return 'Fizz';
        }
        if (current % 5 === 0) {
          return 'Buzz';
        }
        return '';
      }),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('Created A Counter Store');
      const savedState = localStorage.getItem('counter-state');
      if (savedState) {
        const actualState = JSON.parse(savedState) as unknown as CounterState;
        patchState(store, actualState);
      }
      watchState(store, (state) => {
        localStorage.setItem('counter-state', JSON.stringify(state));
      });
    },
    onDestroy() {
      console.log('Counter Store Destroyed');
    },
  }),
);
