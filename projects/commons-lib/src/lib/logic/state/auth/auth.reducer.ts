import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

const userFromStorage = sessionStorage.getItem('user');
export const initialState: AuthState = {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user })),
    on(AuthActions.logout, (state) => ({ ...state, user: null })),
    on(AuthActions.updateUser, (state, { user }) => ({ ...state, user })),
);
