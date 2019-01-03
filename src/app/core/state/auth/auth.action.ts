import { Action } from "@ngrx/store";
import {
    Auth,
    LoginCredentials
} from "./auth.model";

export enum AuthActionTypes {
    Login = "[Auth] Login",
    LoginSuccess = "[Auth] LoginSuccess",
    LoginFault = "[Auth] LoginFault",
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: LoginCredentials) { }
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;
    constructor(public payload: Auth) { }
}

export class LoginFault implements Action {
    readonly type = AuthActionTypes.LoginFault;
    constructor(public errorMessage: string) { }
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFault
    ;
