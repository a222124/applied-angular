import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type ResourceStatus = 'idle' | 'loading' | 'mutating' | 'error';
export type ResourceState = {
  resourceStatus: ResourceStatus;
};

export function withResourceState() {
  return signalStoreFeature(
    withState<ResourceState>({
      resourceStatus: 'idle',
    }),
    withComputed(({ resourceStatus }) => ({
      isLoading: computed(() => resourceStatus() === 'loading'),
      isIdle: computed(() => resourceStatus() === 'idle'),
      isMutating: computed(() => resourceStatus() === 'mutating'),
      isError: computed(() => resourceStatus() === 'error'),
    })),
  );
}

export function setLoading(): ResourceState {
  return { resourceStatus: 'loading' };
}

export function setIdle(): ResourceState {
  return { resourceStatus: 'idle' };
}

export function setMutating(): ResourceState {
  return { resourceStatus: 'mutating' };
}

export function setError(): ResourceState {
  return { resourceStatus: 'error' };
}
