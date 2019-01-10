import { AuthActions, AuthActionTypes } from "./auth.action";
import { Auth } from "./auth.model";

export interface AuthState {
    token: string | null;
}

export const initialState: AuthState = {
    token: "",
};

function loginSuccess(state: AuthState = initialState, data: Auth): AuthState {
    return {
        ...state,
        token: data.token
    };
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess: {
            return loginSuccess(state, action.payload);
        }

        default:
            return state;
    }
}

export const getToken = (state: AuthState) => state.token;
