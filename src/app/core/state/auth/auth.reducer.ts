import { AuthActions, AuthActionTypes } from "./auth.action";
import { Auth } from "../../domain/auth.model";

export interface AuthState {
    token: string | null;
    pending: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    token: "",
    pending: false,
    error: "",
};

function initAuth(state: AuthState = initialState): AuthState {
    return {
        ...state,
        pending: true,
    };
}

function authSuccess(state: AuthState = initialState, data: Auth): AuthState {
    return {
        ...state,
        token: data.token,
        pending: false,
        error: "",
    };
}

function authFailed(state: AuthState = initialState, data: string): AuthState {
    return {
        ...state,
        token: "",
        pending: false,
        error: data,
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

        default:
            return state;
    }
}

export const getToken = (state: AuthState) => state.token;
export const getError = (state: AuthState) => state.error;
export const getPending = (state: AuthState) => state.pending;
