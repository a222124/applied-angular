import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type AuthState = {
  isLoggedIn: boolean;
  userName: string | undefined;
};
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({
    isLoggedIn: false,
    userName: undefined,
  }),
  withMethods((store) => {
    // inject the service to do the oidc login or whatever.
    return {
      logIn: () =>
        patchState(store, { isLoggedIn: true, userName: 'amy@company.com' }),
      logOut: () =>
        patchState(store, { isLoggedIn: false, userName: undefined }),
    };
  }),
);
