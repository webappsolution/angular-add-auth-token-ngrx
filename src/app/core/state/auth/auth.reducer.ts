import { AuthActions, AuthActionTypes } from "./auth.action";
import { Auth } from "../../domain/auth.model";

export interface AuthState {
    token: string | null;
}

export const initialState: AuthState = {
    token: "",
};

function authenticate(state: AuthState = initialState, data: Auth): AuthState {
    return {
        ...state,
        token: data.token
    };
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess:
        case AuthActionTypes.RegisterSuccess:
            return authenticate(state, action.payload);

        default:
            return state;
    }
}

export const getToken = (state: AuthState) => state.token;
