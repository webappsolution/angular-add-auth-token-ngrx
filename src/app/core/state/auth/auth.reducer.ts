import { AuthActions, AuthActionTypes } from "./auth.action";
import { Auth } from "./auth.model";

export interface AuthState {
    token: string | null;
}

export const initialState: AuthState = {
    token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJyaW" +
        "FuIFJpbGV5IiwiaWF0IjoxNTE2MjM5MDIyfQ.Ke1LOKC-5RWHDNCowA8HAvraGgmGwDb5VbxQlAg2j8o",
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
