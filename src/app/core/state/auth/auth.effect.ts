import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "../../service/auth.service";
import {
    AuthActionTypes,
    Login,
    LoginFault,
    LoginSuccess
} from "./auth.action";
import {
    Auth,
    LoginCredentials
} from "./auth.model";

@Injectable()
export class AuthEffect {
    /**
     * Attempt to login.
     */
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        map((action: Login) => action.payload),
        exhaustMap((loginCreds: LoginCredentials) =>
            this.authService.login(loginCreds).pipe(
                map((data: Auth) => new LoginSuccess(data)),
                catchError((err: HttpErrorResponse) => of(new LoginFault(err.message)))
            )
        )
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private authService: AuthService) {}
}
