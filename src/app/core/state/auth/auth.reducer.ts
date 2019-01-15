import { Auth } from "../../domain/auth.model";
import {
    AuthActions,
    AuthActionTypes
} from "./auth.action";

export interface AuthState {
    token: string | null;
    pending: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    token: "",
    pending: false,
    error: ""
};

function initAuth(state: AuthState = initialState): AuthState {
    return {
        ...state,
        pending: true,
        error: ""
    };
}

function authSuccess(state: AuthState = initialState, data: Auth): AuthState {
    return {
        ...state,
        token: data.token,
        pending: false,
        error: ""
    };
}

function authFailed(state: AuthState = initialState, data: string): AuthState {
    return {
        ...state,
        token: "",
        pending: false,
        error: data
    };
}

function resetAuthError(state: AuthState = initialState): AuthState {
    return {
        ...state,
        error: ""
    };
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {

        case AuthActionTypes.Login:
        case AuthActionTypes.Register:
            return initAuth(state);

        case AuthActionTypes.LoginSuccess:
        case AuthActionTypes.RegisterSuccess:
            return authSuccess(state, action.payload);

        case AuthActionTypes.LoginFault:
        case AuthActionTypes.RegisterFault:
            return authFailed(state, action.payload);

        case AuthActionTypes.ResetAuthError:
            return resetAuthError(state);

        default:
            return state;
    }
}

export const getToken = (state: AuthState) => state.token;
export const getError = (state: AuthState) => state.error;
export const getPending = (state: AuthState) => state.pending;
