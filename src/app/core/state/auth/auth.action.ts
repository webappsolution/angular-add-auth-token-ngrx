import { Action } from "@ngrx/store";
import {
    Auth,
    LoginCredentials,
    RegisterCredentials
} from "../../domain/auth.model";

export enum AuthActionTypes {
    Login = "[Auth] Login",
    LoginSuccess = "[Auth] LoginSuccess",
    LoginFault = "[Auth] LoginFault",

    Register = "[Auth] Register",
    RegisterSuccess = "[Auth] RegisterSuccess",
    RegisterFault = "[Auth] RegisterFault",
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
    constructor(public payload: string) { }
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: RegisterCredentials) { }
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionTypes.RegisterSuccess;
    constructor(public payload: Auth) { }
}

export class RegisterFault implements Action {
    readonly type = AuthActionTypes.RegisterFault;
    constructor(public payload: string) { }
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFault
    | Register
    | RegisterSuccess
    | RegisterFault
    ;
