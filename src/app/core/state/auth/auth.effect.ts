import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    Actions,
    Effect,
    ofType
} from "@ngrx/effects";
import {
    Action,
    Store
} from "@ngrx/store";
import {
    Observable,
    of
} from "rxjs";
import {
    catchError,
    exhaustMap,
    map,
    mergeMap
} from "rxjs/operators";
import { appRoutePaths } from "../../../app.routes";
import {
    Auth,
    LoginCredentials,
    RegisterCredentials
} from "../../domain/auth.model";
import { AuthService } from "../../service/auth.service";
import * as RouterActions from "../router/router.action";
import * as AuthActions from "./auth.action";
import { AuthActionTypes } from "./auth.action";

@Injectable()
export class AuthEffect {
    /**
     * Attempt to login.
     */
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Login>(AuthActionTypes.Login),
        map((action: AuthActions.Login) => action.payload),
        exhaustMap((creds: LoginCredentials) =>
            this.authService.login(creds).pipe(
                mergeMap((data: Auth) => [
                    new AuthActions.LoginSuccess(data),
                    new RouterActions.Go({ path: appRoutePaths.beer })
                ]),
                catchError((err: HttpErrorResponse) => of(new AuthActions.LoginFault(err.error.message)))
            )
        )
    );

    /**
     * Attempt to register a user.
     */
    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.Register>(AuthActionTypes.Register),
        map((action: AuthActions.Register) => action.payload),
        exhaustMap((creds: RegisterCredentials) =>
            this.authService.register(creds).pipe(
                mergeMap((data: Auth) => [
                    new AuthActions.RegisterSuccess(data),
                    new RouterActions.Go({ path: appRoutePaths.beer })
                ]),
                catchError((err: HttpErrorResponse) => of(new AuthActions.RegisterFault(err.error.message)))
            )
        )
    );

    /**
     * Routes the user to the login flow.
     */
    @Effect()
    navigateToLogin$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.NavigateToLogin>(AuthActionTypes.NavigateToLogin),
        mergeMap((action) => {
            return [
                new AuthActions.ResetAuthError(),
                new RouterActions.Go({ path: appRoutePaths.login })
            ];
        })
    );

    /**
     * Routes the user to the login flow.
     */
    @Effect()
    navigateToRegister$: Observable<Action> = this.actions$.pipe(
        ofType<AuthActions.NavigateToRegister>(AuthActionTypes.NavigateToRegister),
        mergeMap((action) => {
            return [
                new AuthActions.ResetAuthError(),
                new RouterActions.Go({ path: appRoutePaths.register })
            ];
        })
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private authService: AuthService) {
    }
}
